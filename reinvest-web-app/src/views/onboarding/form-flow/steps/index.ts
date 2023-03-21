import { StepAccountType } from './account-type';
import { StepAccreditedInvestor } from './accredited-investor';
import { StepSignatoryEntity } from './authorized-signatory-entity';
import { StepCompliances } from './compliance';
import { StepCorporationLegalName } from './corporation-legal-name';
import { StepDateOfBirth } from './date-of-birth';
import { StepEmploymentDetails } from './employment-details';
import { StepExperience } from './experience';
import { StepFinraInstitution } from './finra-institution';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
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
  StepPhoneAuthentication,
  StepDateOfBirth,
  StepResidencyStatus,
  StepResidencyGreenCard,
  StepResidencyVisa,
  StepCompliances,
  StepFinraInstitution,
  StepSocialSecurityNumber,
  StepIdentificationDocuments,
  StepAccreditedInvestor,
  StepExperience,
  StepEmploymentDetails,
  StepSignatoryEntity,
  StepCorporationLegalName,
  StepTrustType,
  StepTrustLegalName,
  StepProfilePicture,
];
