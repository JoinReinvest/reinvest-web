import { StepAccountType } from './account-type';
import { StepAccreditedInvestor } from './accredited-investor';
import { StepCheckYourPhone } from './check-your-phone';
import { StepCompliances } from './compliance';
import { StepDateOfBirth } from './date-of-birth';
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

export const FLOW_STEPS = [
  StepAccountType,
  StepFullName,
  StepPhoneNumber,
  StepCheckYourPhone,
  StepPhoneAuthentication,
  StepDateOfBirth,
  StepResidencyStatus,
  StepResidencyGreenCard,
  StepResidencyVisa,
  StepCompliances,
  StepFinraInstitution,
  // StepCompanyTickerSymbols,
  // StepSeniorPoliticalFigure,
  StepSocialSecurityNumber,
  // StepSocialSecurityNumberValidation,
  StepIdentificationDocuments,
  StepIdentificationDocumentsValidation,
  StepPermanentAddress,
  StepAccreditedInvestor,
  StepExperience,
  StepEmploymentStatus,
  StepEmploymentDetails,
  StepNetWorthAndIncome,
  // StepSignatoryEntity,
  // StepCorporationType,
  // StepCorporationLegalName,
  // StepTrustType,
  // StepTrustLegalName,
  // StepEIN,
  // StepBusinessAddress,
  // StepCorporationInformation,
  // StepDocumentsForCorporation,
  // - Major Stakeholder Applicants,
  // StepDocumentsForTrust,
  // - Other Trustees, Grantors and Protectors
  StepProfilePicture,
];
