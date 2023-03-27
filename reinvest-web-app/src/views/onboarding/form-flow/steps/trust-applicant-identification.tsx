import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputFile } from 'components/FormElements/InputFile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { Applicant, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { ACCEPTED_FILES_MIME_TYPES, APPLICANT_IDENTIFICATION, FILE_SIZE_LIMIT_IN_MEGABYTES } from '../schemas';
import { getDefaultIdentificationValueForApplicant } from '../utilities';

type Fields = Pick<Applicant, 'identificationDocument'>;

export const StepTrustApplicantIdentification: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_APPLICANT_IDENTIFICATION,

  doesMeetConditionFields: fields => {
    const { _willHaveTrustTrusteesGrantorsOrProtectors, _currentTrustTrusteeGrantorOrProtector } = fields;
    const hasCurrentApplicant = _currentTrustTrusteeGrantorOrProtector !== undefined;

    return !!_willHaveTrustTrusteesGrantorsOrProtectors && hasCurrentApplicant;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === AccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues = getDefaultIdentificationValueForApplicant(storeFields, AccountType.Trust);

    const { control, formState, handleSubmit } = useForm<Fields>({
      resolver: zodResolver(APPLICANT_IDENTIFICATION),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocument }) => {
      const { _isEditingTrustTrusteeGrantorOrProtector } = storeFields;
      const currentApplicant = { ...storeFields._currentTrustTrusteeGrantorOrProtector, identificationDocument };
      const currentApplicantIndex = currentApplicant._index;
      await updateStoreFields({ _currentTrustTrusteeGrantorOrProtector: currentApplicant });

      if (!!_isEditingTrustTrusteeGrantorOrProtector && currentApplicantIndex) {
        const allApplicants = storeFields.companyMajorStakeholderApplicants || [];
        const updatedApplicants = allApplicants.map((applicant, index) => {
          if (index === currentApplicantIndex) {
            return currentApplicant;
          }

          return applicant;
        });

        await updateStoreFields({
          trustTrusteesGrantorsOrProtectors: updatedApplicants,
          _currentTrustTrusteeGrantorOrProtector: undefined,
          _isEditingTrustTrusteeGrantorOrProtector: false,
        });

        moveToNextStep();

        return;
      } else {
        const allApplicants = storeFields.trustTrusteesGrantorsOrProtectors || [];
        const updatedApplicants = [...allApplicants, currentApplicant];

        await updateStoreFields({ trustTrusteesGrantorsOrProtectors: updatedApplicants, _isEditingTrustTrusteeGrantorOrProtector: false });
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
