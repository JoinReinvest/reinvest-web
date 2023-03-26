import { StepAccountType } from './account-type';
import { StepAccreditedInvestor } from './accredited-investor';
import { StepSignatoryEntity } from './authorized-signatory-entity';
import { StepBusinessAddress } from './business-address';
import { StepCompanyMajorStakeholderApplicantDetails } from './company-major-stakeholder-applicant-details';
import { StepCompanyMajorStakeholderApplicantIdentificationDocument } from './company-major-stakeholder-applicant-identification';
import { StepCompanyMajorStakeholderApplicantList } from './company-major-stakeholder-applicant-list';
import { StepCompanyMajorStakeholderApplicantsLanding } from './company-major-stakeholder-applicants-landing';
import { StepCompanyTickerSymbols } from './company-ticker-symbols';
import { StepCompliances } from './compliance';
import { StepCorporationInformation } from './corporation-information';
import { StepCorporationLegalName } from './corporation-legal-name';
import { StepCorporationType } from './corporation-type';
import { StepDateOfBirth } from './date-of-birth';
import { StepDocumentsForCorporation } from './documents-for-corporation';
import { StepDocumentsForTrust } from './documents-for-trust';
import { StepEIN } from './ein';
import { StepEmploymentDetails } from './employment-details';
import { StepEmploymentStatus } from './employment-status';
import { StepExperience } from './experience';
import { StepFinraInstitution } from './finra-institution';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
import { StepIdentificationDocumentsValidation } from './identification-documents-validation';
import { StepNetWorthAndIncome } from './net-worth-and-income';
import { StepPermanentAddress } from './permanent-address';
import { StepPhoneAuthentication } from './phone-authentication';
import { StepPhoneNumber } from './phone-number';
import { StepProfilePicture } from './profile-picture';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';
import { StepSeniorPoliticalFigure } from './senior-political-figure';
import { StepSocialSecurityNumber } from './social-security-number';
import { StepSocialSecurityNumberValidation } from './social-security-number-validation';
import { StepTrustLegalName } from './trust-legal-name';
import { StepTrustType } from './trust-type';

export const FLOW_STEPS = [
  StepAccountType,
  StepFullName,
  StepPhoneNumber,
  StepPhoneAuthentication,
  StepDateOfBirth,
  StepResidencyStatus,
  StepResidencyGreenCard,
  StepResidencyVisa,
  StepCompliances,
  StepFinraInstitution,
  StepCompanyTickerSymbols,
  StepSeniorPoliticalFigure,
  StepSocialSecurityNumber,
  StepSocialSecurityNumberValidation,
  StepIdentificationDocuments,
  StepIdentificationDocumentsValidation,
  StepPermanentAddress,
  StepAccreditedInvestor,
  StepExperience,
  StepEmploymentStatus,
  StepEmploymentDetails,
  StepNetWorthAndIncome,
  StepSignatoryEntity,
  StepCorporationType,
  StepCorporationLegalName,
  StepTrustType,
  StepTrustLegalName,
  StepEIN,
  StepBusinessAddress,
  StepCorporationInformation,
  StepDocumentsForCorporation,
  StepCompanyMajorStakeholderApplicantsLanding,
  StepCompanyMajorStakeholderApplicantDetails,
  StepCompanyMajorStakeholderApplicantIdentificationDocument,
  StepCompanyMajorStakeholderApplicantList,
  StepDocumentsForTrust,
  // - Other Trustees, Grantors and Protectors
  StepProfilePicture,
];
