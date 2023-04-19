import { StepAccountType } from './account-type';
import { StepAccreditedInvestor } from './accredited-investor';
import { StepSignatoryEntity } from './authorized-signatory-entity';
import { StepBusinessAddress } from './business-address';
import { StepCheckYourPhone } from './check-your-phone';
import { StepCompanyTickerSymbols } from './company-ticker-symbols';
import { StepCompliances } from './compliance';
import { StepCorporationInformation } from './corporation-information';
import { StepCorporationLegalName } from './corporation-legal-name';
import { StepCorporationType } from './corporation-type';
import { StepDateOfBirth } from './date-of-birth';
import { StepDocumentsForTrust } from './documents-for-trust';
import { StepEIN } from './ein';
import { StepEmploymentDetails } from './employment-details';
import { StepEmploymentStatus } from './employment-status';
import { StepExperience } from './experience';
import { StepFinraInstitution } from './finra-institution';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
import { StepNetWorthAndIncome } from './net-worth-and-income';
import { StepPermanentAddress } from './permanent-address';
import { StepPhoneNumber } from './phone-number';
import { StepProfilePicture } from './profile-picture';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';
import { StepSeniorPoliticalFigure } from './senior-political-figure';
import { StepSocialSecurityNumber } from './social-security-number';
import { StepTrustApplicantDetails } from './trust-applicant-details';
import { StepTrustApplicantIdentification } from './trust-applicant-identification';
import { StepTrustApplicantList } from './trust-applicant-list';
import { StepTrustApplicantsLanding } from './trust-applicants-landing';
import { StepTrustLegalName } from './trust-legal-name';
import { StepTrustType } from './trust-type';

export const FLOW_STEPS = [
  StepAccountType,
  StepFullName,
  StepPhoneNumber,
  StepCheckYourPhone,
  StepDateOfBirth,
  StepResidencyStatus,
  StepResidencyGreenCard,
  StepResidencyVisa,
  StepCompliances,
  StepFinraInstitution,
  StepCompanyTickerSymbols,
  StepSeniorPoliticalFigure,
  StepSocialSecurityNumber,
  StepIdentificationDocuments,
  StepPermanentAddress,
  StepAccreditedInvestor,
  StepExperience,
  //individual steps
  StepEmploymentStatus,
  StepEmploymentDetails,
  StepNetWorthAndIncome,
  //corporation steps
  StepCorporationType,
  StepCorporationLegalName,
  //trust steps
  StepTrustType,
  StepTrustLegalName,
  StepSignatoryEntity,
  StepEIN,
  StepBusinessAddress,
  StepCorporationInformation,
  StepDocumentsForTrust,
  StepTrustApplicantsLanding,
  StepTrustApplicantDetails,
  StepTrustApplicantIdentification,
  StepTrustApplicantList,
  StepProfilePicture,
];
