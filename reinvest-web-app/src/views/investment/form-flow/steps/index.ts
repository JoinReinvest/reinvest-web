import { StepAccountSelection } from './account-selection';
import { StepAutomaticDividend } from './automatic-dividend';
import { StepBankAccountConfirmation } from './bank-account-confirmation';
import { StepBankAccountLanding } from './bank-account-landing';
import { StepBankAccountSelection } from './bank-account-selection';
import { StepBusinessAddress } from './business-address';
import { StepCorporateApplicantAddress } from './corporate-applicant-address';
import { StepCorporateApplicantDetails } from './corporate-applicant-details';
import { StepCorporateApplicantIdentification } from './corporate-applicant-identification';
import { StepCorporateApplicantList } from './corporate-applicant-list';
import { StepCorporationInformation } from './corporation-information';
import { StepCorporationLegalName } from './corporation-legal-name';
import { StepCorporationType } from './corporation-type';
import { StepDocumentsForCorporation } from './documents-for-corporation';
import { StepFullName } from './full-name';
import { StepIdentificationDocuments } from './identification-documents';
import { StepInvestmentCompleted } from './investment-completed';
import { StepInvestmentVerification } from './investment-verification';
import { StepLanding } from './landing';
import { StepOneTimeInvestment } from './one-time-investment';
import { StepPermanentAddress } from './permanent-address';
import { StepRecurringDepositSchedule } from './recurring-deposit-schedule';
import { StepRecurringInvestment } from './recurring-investment';
import { StepRecurringInvestmentAmount } from './recurring-investment-amount';
import { StepRecurringInvestmentDate } from './recurring-investment-date';
import { StepRecurringInvestmentInterval } from './recurring-investment-interval';
import { StepSubscriptionAgreements } from './subscription-agreements';

export const STEPS = [
  StepLanding,
  StepAccountSelection,

  // Bank account
  StepBankAccountLanding,
  StepBankAccountSelection,
  StepBankAccountConfirmation,

  // Investment
  StepOneTimeInvestment,

  // Recurring investment
  StepRecurringInvestment,
  StepRecurringInvestmentAmount,
  StepRecurringInvestmentInterval,
  StepRecurringInvestmentDate,
  StepRecurringDepositSchedule,
  StepAutomaticDividend,

  // Subscription agreements + investment initialization
  StepSubscriptionAgreements,
  StepInvestmentVerification,

  // Profile verification
  StepFullName,
  StepPermanentAddress,
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

  // Investment confirmation
  StepInvestmentCompleted,
];
