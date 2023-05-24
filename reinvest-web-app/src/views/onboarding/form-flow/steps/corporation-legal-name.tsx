import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'corporationLegalName'>;

const schema = z.object({
  corporationLegalName: z.string().trim().min(1),
});

export const StepCorporationLegalName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_LEGAL_NAME,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields(fields) {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isCorporateAccount = fields.accountType === DraftAccountType.Corporate;
    const hasTrustFields = allRequiredFieldsExists([fields.corporationType]);

    return hasProfileFields && isCorporateAccount && hasTrustFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { corporationLegalName: storeFields.corporationLegalName || '' };
    const { mutateAsync: completeCorporateDraftAccount, isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ corporationLegalName }) => {
      await updateStoreFields({ corporationLegalName });

      if (storeFields.accountId && corporationLegalName) {
        await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { companyName: { name: corporationLegalName } } });
      }

      moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title="Enter your Corporation's legal name." />
          {error && <ErrorMessagesHandler error={error} />}

          <Input
            name="corporationLegalName"
            control={control}
            placeholder="Corporate Legal Name"
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
