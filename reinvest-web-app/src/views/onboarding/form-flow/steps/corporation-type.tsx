import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CORPORATION_TYPES_AS_OPTIONS, CORPORATION_TYPES_VALUES } from 'reinvest-app-common/src/constants/account-types';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { WhyRequiredCorporationTypeModal } from 'views/whyRequiredModals/WhyRequiredCorporationTypeModal';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'corporationType'>;

const schema = z.object({
  corporationType: z.enum(CORPORATION_TYPES_VALUES),
});

export const StepCorporationType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_TYPE,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields(fields) {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isCorporateAccount = fields.accountType === DraftAccountType.Corporate;

    return hasProfileFields && isCorporateAccount;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
    const { mutateAsync: completeCorporateDraftAccount, isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);

    const defaultValues: Fields = { corporationType: storeFields?.corporationType };
    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ corporationType }) => {
      await updateStoreFields({ corporationType });

      if (storeFields.accountId && corporationType) {
        await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { companyType: { type: corporationType } } });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <ModalTitle title="What type of Corporation do you have?" />
            {error && <ErrorMessagesHandler error={error} />}

            <div className="flex w-full flex-col gap-24">
              <SelectionCards
                name="corporationType"
                control={control}
                options={CORPORATION_TYPES_AS_OPTIONS}
                className="flex flex-col items-stretch justify-center gap-16"
                orientation="vertical"
              />

              <div className="flex w-full justify-center">
                <OpenModalLink
                  label="Not sure which is best for you?"
                  green
                  onClick={onLinkClick}
                />
              </div>
            </div>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              disabled={shouldButtonBeDisabled}
              label="Continue"
              loading={isLoading}
            />
          </ButtonStack>
        </Form>

        <WhyRequiredCorporationTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
