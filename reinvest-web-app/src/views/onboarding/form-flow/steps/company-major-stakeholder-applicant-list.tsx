import { IconPencil } from 'assets/icons/IconPencil';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Typography } from 'components/Typography';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { CompanyMajorStakeholderApplicant, IndexedSchema, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type indexedMajorStakeholderApplicants = IndexedSchema<CompanyMajorStakeholderApplicant>[];

export const StepCompanyMajorStakeholderApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.COMPANY_MAJOR_STAKEHOLDER_APPLICANT_LIST,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants, companyMajorStakeholderApplicants } = fields;
    const hasMajorStakeholderApplicants = !!companyMajorStakeholderApplicants?.length;

    return !!_willHaveMajorStakeholderApplicants && hasMajorStakeholderApplicants;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const majorStakeholderApplicants = storeFields.companyMajorStakeholderApplicants || [];

    const indexedStakeholderApplicants: indexedMajorStakeholderApplicants = majorStakeholderApplicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const onEditApplicant = (applicant: indexedMajorStakeholderApplicants[number]) => {
      const hasIndex = applicant._index !== undefined;

      if (hasIndex) {
        // set the current major stakeholder applicant as this value
        updateStoreFields({ _currentCompanyMajorStakeholder: applicant, _isEditingCompanyMajorStakeholderApplicant: true });
        moveToStepByIdentifier(Identifiers.COMPANY_MAJOR_STAKEHOLDER_APPLICANT_DETAILS);
      }
    };

    const onAddNewApplication = () => {
      updateStoreFields({ _currentCompanyMajorStakeholder: undefined });
      moveToStepByIdentifier(Identifiers.COMPANY_MAJOR_STAKEHOLDER_APPLICANT_DETAILS);
    };

    const onContinue = () => {
      moveToNextStep();
    };

    return (
      <div className="relative grid h-full grid-cols-1 grid-rows-[1fr_auto] justify-between gap-16">
        <div className="flex flex-col gap-60 lg:justify-center lg:gap-16">
          <BlackModalTitle title="Your applicants." />

          <ul className="flex flex-col gap-16">
            {indexedStakeholderApplicants.map(applicant => generateApplicantListItem(corporationLegalName, applicant, () => onEditApplicant(applicant)))}
          </ul>
        </div>

        <ButtonStack>
          <Button
            variant="outlined"
            label="Add Applicant"
            onClick={onAddNewApplication}
            className="text-green-frost-01"
          />

          <Button
            label="Continue"
            onClick={onContinue}
          />
        </ButtonStack>
      </div>
    );
  },
};

const generateApplicantListItem = (corporationLegalName: string, applicant: indexedMajorStakeholderApplicants[number], onIconClick: () => void) => {
  const key = `${corporationLegalName}-${applicant._index}`;
  const applicantFullName = `${applicant.firstName} ${applicant.lastName}`;

  return (
    <li
      key={key}
      className="flex items-center justify-between"
    >
      <Typography variant="paragraph-emphasized">{applicantFullName}</Typography>

      <IconPencil
        className="cursor-pointer fill-green-frost-01"
        onClick={onIconClick}
      />
    </li>
  );
};
