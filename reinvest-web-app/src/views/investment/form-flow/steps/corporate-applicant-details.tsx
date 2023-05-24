import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { InputBirthDate } from 'components/FormElements/InputBirthDate';
import { InputSocialSecurityNumber } from 'components/FormElements/InputSocialSecurityNumber';
import { ModalTitle } from 'components/ModalElements/Title';
import { Select } from 'components/Select';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STAKEHOLDER_RESIDENCY_STATUS_OPTIONS } from 'reinvest-app-common/src/constants/residenty-status';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Applicant } from '../../../onboarding/form-flow/form-fields';
import { APPLICANT_WITHOUT_IDENTIFICATION } from '../../../onboarding/form-flow/schemas';
import { getDefaultValuesForApplicantWithoutIdentification } from '../../../onboarding/form-flow/utilities';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Omit<Applicant, 'identificationDocument'>;

export const StepCorporateApplicantDetails: StepParams<FlowFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_DETAILS,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateStakeholderData;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues = getDefaultValuesForApplicantWithoutIdentification(storeFields, DraftAccountType.Corporate);

    const { control, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(APPLICANT_WITHOUT_IDENTIFICATION),
      defaultValues: async () => defaultValues,
    });

    const fieldValue = watch('socialSecurityNumber');
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const [hasFieldBeenClearedOnce, setHasFieldBeenClearedOnce] = useState(false);
    const hasStoredValue = !!defaultValues.socialSecurityNumber;
    const hasStoredValueAndClearedTheField = hasStoredValue && hasFieldBeenClearedOnce;
    const willUseSecureMask = hasStoredValueAndClearedTheField ? false : hasStoredValue ? true : !hasStoredValue ? false : true;

    useEffect(() => {
      const hasFieldBeenCleared = fieldValue === '';

      if (hasFieldBeenCleared) {
        setHasFieldBeenClearedOnce(true);
      }
    }, [fieldValue]);

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({
        _currentCompanyMajorStakeholder: {
          ...storeFields._currentCompanyMajorStakeholder,
          ...fields,
          _index: storeFields._currentCompanyMajorStakeholder?._index,
        },
      });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title="Enter the following information for your applicant." />

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
              willUseSecureMask={willUseSecureMask}
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
