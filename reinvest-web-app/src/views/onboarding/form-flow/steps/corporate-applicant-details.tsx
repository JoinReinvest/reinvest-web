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
import { SubmitHandler, useForm } from 'react-hook-form';
import { STAKEHOLDER_RESIDENCY_STATUS_OPTIONS } from 'reinvest-app-common/src/constants/residenty-status';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Applicant, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { APPLICANT_WITHOUT_IDENTIFICATION } from '../schemas';
import { getDefaultValuesForApplicantWithoutIdentification } from '../utilities';

type Fields = Omit<Applicant, 'identificationDocument'>;

export const StepCorporateApplicantDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_DETAILS,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants } = fields;
    const hasProtectorsOrGrantors = !!fields.companyMajorStakeholderApplicants?.length;

    return !!_willHaveMajorStakeholderApplicants && !hasProtectorsOrGrantors;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues = getDefaultValuesForApplicantWithoutIdentification(storeFields, DraftAccountType.Corporate);

    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(APPLICANT_WITHOUT_IDENTIFICATION),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ _currentCompanyMajorStakeholder: { ...fields, _index: storeFields._currentCompanyMajorStakeholder?._index } });
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

            <Select
              name="domicile"
              control={control}
              options={STAKEHOLDER_RESIDENCY_STATUS_OPTIONS}
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
