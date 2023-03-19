import { StepAccountType } from './account-type';
import { StepCheckYourPhone } from './check-your-phone';
import { StepCompliances } from './compliance';
import { StepDateOfBirth } from './date-of-birth';
import { StepEmploymentDetails } from './employment-details';
import { StepExperience } from './experience';
import { StepFinraInstitution } from './finra-institution';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
import { StepNetWorthAndIncome } from './net-worth-and-income';
import { StepPhoneNumber } from './phone-number';
import { StepProfilePicture } from './profile-picture';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';
import { StepSocialSecurityNumber } from './social-security-number';

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
  StepSocialSecurityNumber,
  StepIdentificationDocuments,
  StepExperience,
  StepEmploymentDetails,
  StepNetWorthAndIncome,
  StepProfilePicture,
];
