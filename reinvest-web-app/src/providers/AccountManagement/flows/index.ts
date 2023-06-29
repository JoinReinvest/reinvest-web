import { FlowIdentifiers } from '../enums';
import { SubFlow } from '../interfaces';
import { FLOW_ACCOUNT_ACTIVITY } from './account-activity';
import { FLOW_BANK_ACCOUNT } from './bank-account';
import { FLOW_CANCEL_RECURRING_INVESTMENT } from './cancel-recurring-investment';
import { FLOW_CHANGE_PASSWORD } from './change-password';
import { FLOW_DOCUMENTS_CORPORATE_TRUST } from './coportate-trust-documents';
import { FLOW_DIVIDEND_REINVESTING } from './dividend-reinvesting';
import { FLOW_CHANGE_BENEFICIARY_NAME } from './edit-beneficiary-name';
import { FLOW_CHANGE_NAME } from './edit-name';
import { FLOW_EMAIL_ADDRESS } from './email-address';
import { FLOW_EMPLOYMENT_DETAILS } from './employment-details';
import { FLOW_FUNDS_WITHDRAWAL } from './funds-withdrawal';
import { FLOW_INVESTMENT_HISTORY } from './investment-history';
import { FLOW_REMOVE_ACCOUNT } from './remove-account';
import { FLOW_UPDATE_ADDRESS } from './update-address';
import { FLOW_PHONE_NUMBER } from './update-phone-number';

export const FLOWS = new Map<FlowIdentifiers, SubFlow>([
  [FlowIdentifiers.BANK_ACCOUNT, FLOW_BANK_ACCOUNT],
  [FlowIdentifiers.INVESTMENT_HISTORY, FLOW_INVESTMENT_HISTORY],
  [FlowIdentifiers.DIVIDEND_REINVESTING, FLOW_DIVIDEND_REINVESTING],
  [FlowIdentifiers.UPDATE_ADDRESS, FLOW_UPDATE_ADDRESS],
  [FlowIdentifiers.CHANGE_PASSWORD, FLOW_CHANGE_PASSWORD],
  [FlowIdentifiers.NAME, FLOW_CHANGE_NAME],
  [FlowIdentifiers.REMOVE_ACCOUNT, FLOW_REMOVE_ACCOUNT],
  [FlowIdentifiers.EMAIL_ADDRESS, FLOW_EMAIL_ADDRESS],
  [FlowIdentifiers.PHONE_NUMBER, FLOW_PHONE_NUMBER],
  [FlowIdentifiers.WITHDRAW_FUNDS, FLOW_FUNDS_WITHDRAWAL],
  [FlowIdentifiers.RECURRING_INVESTMENTS, FLOW_CANCEL_RECURRING_INVESTMENT],
  [FlowIdentifiers.DOCUMENTS, FLOW_DOCUMENTS_CORPORATE_TRUST],
  [FlowIdentifiers.BENEFICIARY_NAME, FLOW_CHANGE_BENEFICIARY_NAME],
  [FlowIdentifiers.ACCOUNT_ACTIVITY, FLOW_ACCOUNT_ACTIVITY],
  [FlowIdentifiers.EMPLOYMENT_DETAILS, FLOW_EMPLOYMENT_DETAILS],
]);
