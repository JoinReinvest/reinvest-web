import { StepAutomaticDividend } from './automatic-dividend';
import { StepBankSelection } from './bank-selection';
import { StepConfirmation } from './confirmation';
import { StepCorporateApplicantAddress } from './corporate-applicant-address';
import { StepCorporateApplicantDetails } from './corporate-applicant-details';
import { StepCorporateApplicantIdentification } from './corporate-applicant-identification';
import { StepCorporateApplicantList } from './corporate-applicant-list';
import { StepDateOfBirth } from './date-of-birth';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
import { StepInitialInvestment } from './initial-investment';
import { StepInvestmentCompleted } from './investment-completed';
import { StepInvestmentVerification } from './investment-verification';
import { StepLanding } from './landing';
import { StepRecurringInvestment } from './recurring-investment';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';
import { StepSubscriptionAgreements } from './subscription-agreements';

export const STEPS = [
  StepLanding,
  StepBankSelection,
  StepConfirmation,
  StepInitialInvestment,
  StepRecurringInvestment,
  StepAutomaticDividend,
  StepSubscriptionAgreements,
  StepInvestmentVerification,
  StepFullName,
  StepDateOfBirth,
  StepResidencyStatus,
  StepResidencyVisa,
  StepResidencyGreenCard,
  StepIdentificationDocuments,
  StepInvestmentCompleted,
  StepCorporateApplicantList,
  StepCorporateApplicantDetails,
  StepCorporateApplicantAddress,
  StepCorporateApplicantIdentification,
  StepCorporateApplicantDetails,
];
