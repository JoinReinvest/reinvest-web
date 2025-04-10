import { Identifiers } from './form-flow/identifiers';

export const FLOW_STEPS_WITH_BLACK_MODAL: string[] = [
  Identifiers.INVESTMENT_VERIFICATION,
  Identifiers.FULL_NAME,
  Identifiers.DATE_OF_BIRTH,
  Identifiers.RESIDENCY_STATUS,
  Identifiers.RESIDENCY_VISA,
  Identifiers.RESIDENCY_GREEN_CARD,
  Identifiers.IDENTIFICATION_DOCUMENTS,
  Identifiers.CORPORATE_APPLICANT_LIST,
  Identifiers.CORPORATE_APPLICANT_DETAILS,
  Identifiers.APPLICANT_ADDRESS,
  Identifiers.CORPORATE_APPLICANT_IDENTIFICATION,
  Identifiers.CORPORATE_APPLICANT_DETAILS,
  Identifiers.PERMANENT_ADDRESS,
];

export const FLOW_STEPS_WITH_X_BUTTON: string[] = [
  Identifiers.LANDING,
  Identifiers.BANK_ACCOUNT_SELECTION,
  Identifiers.BANK_ACCOUNT_CONFIRMATION,
  Identifiers.ONE_TIME_INVESTMENT,
  Identifiers.INVESTMENT_COMPLETED,
];
