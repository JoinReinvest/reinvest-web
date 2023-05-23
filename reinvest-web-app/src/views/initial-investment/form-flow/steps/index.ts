import { StepAutomaticDividend } from './automatic-dividend';
import { StepBankSelection } from './bank-selection';
import { StepBusinessAddress } from './business-address';
import { StepConfirmation } from './confirmation';
import { StepCorporateApplicantAddress } from './corporate-applicant-address';
import { StepCorporateApplicantDetails } from './corporate-applicant-details';
import { StepCorporateApplicantIdentification } from './corporate-applicant-identification';
import { StepCorporateApplicantList } from './corporate-applicant-list';
import { StepCorporationInformation } from './corporation-information';
import { StepCorporationLegalName } from './corporation-legal-name';
import { StepCorporationType } from './corporation-type';
import { StepDateOfBirth } from './date-of-birth';
import { StepDocumentsForCorporation } from './documents-for-corporation';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
import { StepInitialInvestment } from './initial-investment';
import { StepInvestmentCompleted } from './investment-completed';
import { StepInvestmentVerification } from './investment-verification';
import { StepLanding } from './landing';
import { StepRecurringDepositSchedule } from './recurring-deposit-schedule';
import { StepRecurringInvestment } from './recurring-investment';
import { StepRecurringInvestmentAmount } from './recurring-investment-amount';
import { StepRecurringInvestmentDate } from './recurring-investment-date';
import { StepRecurringInvestmentInterval } from './recurring-investment-interval';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';
import { StepSubscriptionAgreements } from './subscription-agreements';

export const STEPS = [
  StepLanding,
  StepBankSelection,
  StepConfirmation,
  StepInitialInvestment,
  StepAutomaticDividend,

  StepRecurringInvestment,
  StepRecurringInvestment,
  StepRecurringInvestmentAmount,
  StepRecurringInvestmentInterval,
  StepRecurringInvestmentDate,
  StepRecurringDepositSchedule,

  StepSubscriptionAgreements,
  StepInvestmentVerification,
  StepFullName,
  StepDateOfBirth,
  StepResidencyStatus,
  StepResidencyVisa,
  StepResidencyGreenCard,
  StepIdentificationDocuments,
  StepCorporationType,
  StepCorporationLegalName,
  StepBusinessAddress,
  StepCorporationInformation,
  StepDocumentsForCorporation,
  StepCorporateApplicantList,
  StepCorporateApplicantDetails,
  StepCorporateApplicantAddress,
  StepCorporateApplicantIdentification,
  StepInvestmentCompleted,
];
