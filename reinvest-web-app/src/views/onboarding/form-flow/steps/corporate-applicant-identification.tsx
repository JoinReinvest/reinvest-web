import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputFile } from 'components/FormElements/InputFile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Applicant, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { ACCEPTED_FILES_MIME_TYPES, APPLICANT_IDENTIFICATION, FILE_SIZE_LIMIT_IN_MEGABYTES } from '../schemas';
import { getDefaultIdentificationValueForApplicant } from '../utilities';

type Fields = Pick<Applicant, 'identificationDocument'>;

export const StepCorporateApplicantIdentification: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_IDENTIFICATION,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants, _currentCompanyMajorStakeholder } = fields;
    const hasCurrentCompanyMajorStakeholder = _currentCompanyMajorStakeholder !== undefined;

    return !!_willHaveMajorStakeholderApplicants && hasCurrentCompanyMajorStakeholder;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues = getDefaultIdentificationValueForApplicant(storeFields, DraftAccountType.Corporate);

    const { control, formState, handleSubmit } = useForm<Fields>({
      resolver: zodResolver(APPLICANT_IDENTIFICATION),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocument }) => {
      const { _isEditingCompanyMajorStakeholderApplicant } = storeFields;
      const currentMajorStakeholderApplicant = { ...storeFields._currentCompanyMajorStakeholder, identificationDocument };
      const currentMajorStakeholderApplicantIndex = currentMajorStakeholderApplicant._index;
      await updateStoreFields({ _currentCompanyMajorStakeholder: currentMajorStakeholderApplicant });

      if (!!_isEditingCompanyMajorStakeholderApplicant && currentMajorStakeholderApplicantIndex) {
        const allApplicants = storeFields.companyMajorStakeholderApplicants || [];
        const updatedApplicants = allApplicants.map((applicant, index) => {
          if (index === currentMajorStakeholderApplicantIndex) {
            return currentMajorStakeholderApplicant;
          }

          return applicant;
        });

        await updateStoreFields({
          companyMajorStakeholderApplicants: updatedApplicants,
          _currentCompanyMajorStakeholder: undefined,
          _isEditingCompanyMajorStakeholderApplicant: false,
        });

        moveToNextStep();

        return;
      } else {
        const allApplicants = storeFields.companyMajorStakeholderApplicants || [];
        const updatedApplicants = [...allApplicants, currentMajorStakeholderApplicant];

        await updateStoreFields({ companyMajorStakeholderApplicants: updatedApplicants, _isEditingCompanyMajorStakeholderApplicant: false });
        moveToNextStep();
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Upload the ID of your applicant." />

          <InputFile
            name="identificationDocument"
            control={control}
            accepts={ACCEPTED_FILES_MIME_TYPES}
            sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
            placeholder="Upload File"
          />
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
