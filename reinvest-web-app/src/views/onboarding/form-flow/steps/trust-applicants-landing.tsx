import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { MAXIMUM_NUMBER_OF_APPLICANTS } from '../schemas';

export const StepTrustApplicantsLanding: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isTrustAccount = fields.accountType === DraftAccountType.Trust;
    const hasTrustFields = allRequiredFieldsExists([
      fields.trustType,
      fields.trustLegalName,
      fields.businessAddress,
      fields.fiduciaryEntityInformation?.industry,
      fields.fiduciaryEntityInformation?.annualRevenue,
      fields.fiduciaryEntityInformation?.numberOfEmployees,
    ]);

    const hasUploadedDocuments = !!fields.documentsForTrust?.length;
    const hasProtectorsOrGrantors = !!fields.trustTrusteesGrantorsOrProtectors?.length;

    return isTrustAccount && hasProfileFields && hasTrustFields && hasUploadedDocuments && !hasProtectorsOrGrantors;
  },

  Component: ({ updateStoreFields, moveToNextStep, moveToStepByIdentifier, storeFields }: StepComponentProps<OnboardingFormFields>) => {
    const applicants = storeFields.trustTrusteesGrantorsOrProtectors || [];
    const hasReachedMaximumNumberOfApplicants = applicants.length >= MAXIMUM_NUMBER_OF_APPLICANTS;

    const onAddNewApplicant = async () => {
      await updateStoreFields({ _willHaveTrustTrusteesGrantorsOrProtectors: true });
      moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_DETAILS);
    };

    const onSkip = async () => {
      await updateStoreFields({ _willHaveTrustTrusteesGrantorsOrProtectors: false });
      moveToNextStep();
    };

    return (
      <Form>
        <FormContent>
          <BlackModalTitle
            title="Other Trustees, Grantors and Protectors "
            subtitle="For all other  Trustees, Grantors and Protectors that are included in the same Trust, we require their information."
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
