import { StepAccountType } from './account-type';
import { StepAccreditedInvestor } from './accredited-investor';
import { StepSignatoryEntity } from './authorized-signatory-entity';
import { StepBusinessAddress } from './business-address';
import { StepCheckYourPhone } from './check-your-phone';
import { StepCompliances } from './compliance';
import { StepCorporationLegalName } from './corporation-legal-name';
import { StepDateOfBirth } from './date-of-birth';
import { StepEmploymentDetails } from './employment-details';
import { StepExperience } from './experience';
import { StepFinraInstitution } from './finra-institution';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
import { StepNetWorthAndIncome } from './net-worth-and-income';
import { StepPermanentAddress } from './permanent-address';
import { StepPhoneAuthentication } from './phone-authentication';
import { StepPhoneNumber } from './phone-number';
import { StepProfilePicture } from './profile-picture';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';
import { StepSocialSecurityNumber } from './social-security-number';
import { StepTrustLegalName } from './trust-legal-name';
import { StepTrustType } from './trust-type';

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
  StepSocialSecurityNumber,
  StepIdentificationDocuments,
  StepPermanentAddress,
  StepAccreditedInvestor,
  StepExperience,
  StepEmploymentDetails,
  StepNetWorthAndIncome,
  // StepSignatoryEntity,
  // StepCorporationLegalName,
  // StepBusinessAddress,
  // StepTrustType,
  // StepTrustLegalName,
  StepProfilePicture,
];
