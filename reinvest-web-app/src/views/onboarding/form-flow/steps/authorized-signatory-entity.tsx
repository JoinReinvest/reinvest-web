import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { RadioGroupOptionItem, RadioGroupOptions } from 'components/FormElements/RadioGroupOptions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

interface Fields {
  isAuthorizedSignatoryEntity: 'yes' | 'no';
}

const schema = z.object({
  isAuthorizedSignatoryEntity: z.enum(['yes', 'no']),
});

const OPTIONS: RadioGroupOptionItem[] = [
  {
    title: 'Yes',
    value: 'yes',
  },
  {
    title: 'No',
    value: 'no',
  },
];

export const StepSignatoryEntity: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.AUTHORIZED_SIGNATORY_ENTITY,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate || accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.address,
      fields.isAccreditedInvestor,
      fields.experience,
      fields.employmentStatus,
    ];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isAccountCorporateOrTrust = fields.accountType === DraftAccountType.Corporate || fields.accountType === DraftAccountType.Trust;

    return (isAccountCorporateOrTrust && hasProfileFields) || isAccountCorporateOrTrust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const hasStoredValue = storeFields.isAuthorizedSignatoryEntity !== undefined;
    const storedValue = storeFields.isAuthorizedSignatoryEntity ? 'yes' : 'no';
    const defaultValues: Fields = { isAuthorizedSignatoryEntity: hasStoredValue ? storedValue : 'no' };
    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const isAuthorizedSignatoryEntity = fields?.isAuthorizedSignatoryEntity === 'yes';

      await updateStoreFields({ isAuthorizedSignatoryEntity });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Are you an authorized signatory & beneficiary owner of this entity?" />

          <RadioGroupOptions
            name="isAuthorizedSignatoryEntity"
            control={control}
            options={OPTIONS}
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            disabled={shouldButtonBeDisabled}
            label="Continue"
          />
        </ButtonStack>
      </Form>
    );
  },
};
