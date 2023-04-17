import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

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
      fields.corporationIndustry,
      fields.corporationAnnualRevenue,
      fields.corporationNumberOfEmployees,
    ]);

    const hasUploadedDocuments = !!fields.documentsForTrust?.length;
    const hasProtectorsOrGrantors = !!fields.trustTrusteesGrantorsOrProtectors?.length;

    return isTrustAccount && hasProfileFields && hasTrustFields && hasUploadedDocuments && !hasProtectorsOrGrantors;
  },

  Component: ({ updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
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
            label="Add Applicant"
            className="text-green-frost-01"
            onClick={onAddNewApplicant}
          />

          <Button
            label="Skip"
            onClick={onSkip}
          />
        </ButtonStack>
      </Form>
    );
  },
};
