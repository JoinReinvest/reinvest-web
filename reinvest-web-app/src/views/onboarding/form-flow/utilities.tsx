import { IconPencil } from 'assets/icons/IconPencil';
import { Typography } from 'components/Typography';
import { DraftAccountType, Stakeholder } from 'reinvest-app-common/src/types/graphql';

import { FlowFields } from '../../initial-investment/form-flow/fields';
import { Applicant, IndexedSchema, OnboardingFormFields } from './form-fields';

type GetDefaultValuesForApplicantWithoutIdentification = (
  fields: OnboardingFormFields | FlowFields,
  type: DraftAccountType.Corporate | DraftAccountType.Trust,
) => Omit<Applicant, 'identificationDocument'>;
export const getDefaultValuesForApplicantWithoutIdentification: GetDefaultValuesForApplicantWithoutIdentification = (
  fields,
  type = DraftAccountType.Corporate,
) => {
  const isRetrivingFieldsForCorporate = type === DraftAccountType.Corporate;

  const listOfApplicants = (isRetrivingFieldsForCorporate ? fields.companyMajorStakeholderApplicants : fields.trustTrusteesGrantorsOrProtectors) || [];
  const hasApplicants = !!listOfApplicants.length;
  const currentApplicant = isRetrivingFieldsForCorporate ? fields._currentCompanyMajorStakeholder : fields._currentTrustTrusteeGrantorOrProtector;
  const currentApplicantIndex = isRetrivingFieldsForCorporate ? currentApplicant?._index : currentApplicant?._index;
  const hasAnIndex = currentApplicantIndex !== undefined;
  const hasAtLeastOneFieldFilled = Object.values(currentApplicant || {}).some(Boolean);
  const isEditingAnApplicant = isRetrivingFieldsForCorporate
    ? fields._isEditingCompanyMajorStakeholderApplicant
    : fields._isEditingTrustTrusteeGrantorOrProtector;

  if (hasApplicants && isEditingAnApplicant && hasAnIndex) {
    const applicant = listOfApplicants.at(currentApplicantIndex);

    if (applicant) {
      return { ...applicant };
    }
  }

  if (!isEditingAnApplicant && hasAtLeastOneFieldFilled) {
    return { ...(currentApplicant || {}) };
  }

  return {};
};

type GetDefaultIdentificationValueForApplicant = (
  fields: OnboardingFormFields,
  type: DraftAccountType.Corporate | DraftAccountType.Trust,
) => Pick<Applicant, 'identificationDocuments'>;
export const getDefaultIdentificationValueForApplicant: GetDefaultIdentificationValueForApplicant = (fields, type) => {
  const isRetrivingFieldsForCorporate = type === DraftAccountType.Corporate;

  const listOfApplicants = (isRetrivingFieldsForCorporate ? fields.companyMajorStakeholderApplicants : fields.trustTrusteesGrantorsOrProtectors) || [];
  const hasApplicants = !!listOfApplicants.length;
  const currentApplicant = isRetrivingFieldsForCorporate ? fields._currentCompanyMajorStakeholder : fields._currentTrustTrusteeGrantorOrProtector;
  const currentApplicantIndex = isRetrivingFieldsForCorporate ? currentApplicant?._index : currentApplicant?._index;
  const hasAnIndex = currentApplicantIndex !== undefined;
  const isEditingAnApplicant = isRetrivingFieldsForCorporate
    ? fields._isEditingCompanyMajorStakeholderApplicant
    : fields._isEditingTrustTrusteeGrantorOrProtector;

  if (hasApplicants && !!isEditingAnApplicant && hasAnIndex) {
    const applicant = listOfApplicants.at(currentApplicantIndex);
    const hasIdentificationDocument = !!applicant?.identificationDocuments;

    if (hasIdentificationDocument) {
      return { identificationDocuments: applicant.identificationDocuments };
    }
  }

  return { identificationDocuments: [] };
};

export const generateApplicantListItem = (corporationLegalName: string, applicant: IndexedSchema<Applicant>, onIconClick: () => void) => {
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

export const formatStakeholdersForStorage = (stakeholders: Stakeholder[]): Applicant[] => {
  return stakeholders.map(stakeholder => ({
    firstName: stakeholder?.name?.firstName || undefined,
    lastName: stakeholder?.name?.lastName || undefined,
    residentialAddress: {
      addressLine1: stakeholder?.address?.addressLine1 || '',
      addressLine2: stakeholder?.address?.addressLine2 || '',
      city: stakeholder?.address?.city || '',
      country: stakeholder?.address?.country || '',
      state: stakeholder?.address?.state || '',
      zip: stakeholder?.address?.zip || '',
    },
    dateOfBirth: stakeholder?.dateOfBirth?.dateOfBirth,
    domicile: stakeholder?.domicile?.type || undefined,
    middleName: stakeholder?.name?.middleName || undefined,
    socialSecurityNumber: stakeholder?.ssn || undefined,
    identificationDocuments: stakeholder?.idScan?.map(idScan => ({ id: idScan?.id, fileName: idScan?.fileName })),
    id: stakeholder?.id || undefined,
  }));
};
