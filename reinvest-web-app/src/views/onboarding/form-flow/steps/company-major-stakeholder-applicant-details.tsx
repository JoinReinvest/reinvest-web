import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { InputBirthDate } from 'components/FormElements/InputBirthDate';
import { InputSocialSecurityNumber } from 'components/FormElements/InputSocialSecurityNumber';
import { Select } from 'components/Select';
import { RESIDENCY_STATUS_AS_SELECT_OPTIONS } from 'constants/residenty-status';
import { SubmitHandler, useForm } from 'react-hook-form';
import { dateOlderThanEighteenYearsSchema, formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { CompanyMajorStakeholderApplicant, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Omit<CompanyMajorStakeholderApplicant, 'identificationDocument'>;

const schema = z.object({
  firstName: formValidationRules.firstName,
  middleName: formValidationRules.middleName,
  lastName: formValidationRules.lastName,
  residentialAddress: z.string().min(1),
  socialSecurityNumber: z.string().min(1),
  dateOfBirth: dateOlderThanEighteenYearsSchema,
  domicile: z.enum(['us', 'green-card', 'visa']),
});

const getDefaultValues = (fields: OnboardingFormFields): Fields => {
  const { _isEditingCompanyMajorStakeholderApplicant, _currentCompanyMajorStakeholder, companyMajorStakeholderApplicants } = fields;
  const hasMajorStakeholderApplicants = !!companyMajorStakeholderApplicants?.length;
  const currentCompanyMajorStakeholderIndex = _currentCompanyMajorStakeholder?._index;
  const hasIndex = currentCompanyMajorStakeholderIndex !== undefined;
  const hasAtLeastOneFieldFilled = Object.values(_currentCompanyMajorStakeholder || {}).some(Boolean);

  const isEditingAMajorStakeholderApplicant = hasMajorStakeholderApplicants && !!_isEditingCompanyMajorStakeholderApplicant && hasIndex;
  const isCreatingAMajorStakeholderApplicant = !_isEditingCompanyMajorStakeholderApplicant && hasAtLeastOneFieldFilled;

  if (isEditingAMajorStakeholderApplicant) {
    const applicant = companyMajorStakeholderApplicants.at(currentCompanyMajorStakeholderIndex);

    if (applicant) {
      return { ...applicant };
    }
  }

  if (isCreatingAMajorStakeholderApplicant) {
    return { ...(_currentCompanyMajorStakeholder || {}) };
  }

  return {};
};

export const StepCompanyMajorStakeholderApplicantDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.COMPANY_MAJOR_STAKEHOLDER_APPLICANT_DETAILS,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants } = fields;

    return !!_willHaveMajorStakeholderApplicants;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === AccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues = getDefaultValues(storeFields);

    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ _currentCompanyMajorStakeholder: fields });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Enter the following information for your applicant." />

          <div className="flex w-full flex-col gap-16">
            <Input
              name="firstName"
              control={control}
              placeholder="First Name"
            />

            <Input
              name="middleName"
              control={control}
              placeholder="Middle Name (Optional)"
            />

            <Input
              name="lastName"
              control={control}
              placeholder="Last Name"
            />

            <InputBirthDate
              name="dateOfBirth"
              control={control}
              placeholder="DOB (MM/DD/YYYY)"
            />

            <InputSocialSecurityNumber
              name="socialSecurityNumber"
              control={control}
            />

            <Input
              name="residentialAddress"
              control={control}
              placeholder="Residential Address"
            />

            <Select
              name="domicile"
              control={control}
              options={RESIDENCY_STATUS_AS_SELECT_OPTIONS}
              placeholder="Domicile"
              defaultValue={defaultValues?.domicile}
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
