import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { MAXIMUM_NUMBER_OF_APPLICANTS } from '../schemas';

export const StepCorporateApplicantsLanding: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isCorporateAccount = fields.accountType === DraftAccountType.Corporate;
    const hasCorporateFields = allRequiredFieldsExists([
      fields.corporationType,
      fields.corporationLegalName,
      fields.businessAddress,
      fields.fiduciaryEntityInformation?.industry,
      fields.fiduciaryEntityInformation?.annualRevenue,
      fields.fiduciaryEntityInformation?.numberOfEmployees,
    ]);

    const hasUploadedDocuments = !!fields.documentsForCorporation?.length;
    const hasProtectorsOrGrantors = !!fields.companyMajorStakeholderApplicants?.length;

    return isCorporateAccount && hasProfileFields && hasCorporateFields && hasUploadedDocuments && !hasProtectorsOrGrantors;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const applicants = storeFields?.trustTrusteesGrantorsOrProtectors || [];
    const hasReachedMaximumNumberOfApplicants = applicants.length >= MAXIMUM_NUMBER_OF_APPLICANTS;

    const onAddNewApplicant = async () => {
      await updateStoreFields({ _willHaveMajorStakeholderApplicants: true });
      moveToNextStep();
    };

    const onSkip = async () => {
      await updateStoreFields({ _willHaveMajorStakeholderApplicants: false });
      moveToNextStep();
    };

    return (
      <Form>
        <FormContent>
          <ModalTitle
            title="Major Stakeholder Applicants"
            subtitle="For each major stakeholder with a 20% or greater equity stake, we require their information."
          />
        </FormContent>

        <ButtonStack>
          <Button
            variant="outlined"
            label="Skip"
            onClick={onSkip}
            className="text-green-frost-01"
          />

          <Button
            label="Add Applicant"
            onClick={onAddNewApplicant}
            disabled={hasReachedMaximumNumberOfApplicants}
          />
        </ButtonStack>
      </Form>
    );
  },
};
