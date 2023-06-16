import { FlowIdentifiers } from '../enums/flow';
import { SubFlow } from '../interfaces/flows';
import { FLOW_CHANGE_PASSWORD } from './change-password';
import { FLOW_DIVIDEND_REINVESTING } from './dividend-reinvesting';
import { FLOW_CHANGE_NAME } from './edit-name';
import { FLOW_EMAIL_ADDRESS } from './email-address';
import { FLOW_INVESTMENT_HISTORY } from './investment-history';
import { FLOW_REMOVE_ACCOUNT } from './remove-account';
import { FLOW_UPDATE_ADDRESS } from './update-address';
import { FLOW_PHONE_NUMBER } from './update-phone-number';

export const FLOWS = new Map<FlowIdentifiers, SubFlow>([
  [FlowIdentifiers.INVESTMENT_HISTORY, FLOW_INVESTMENT_HISTORY],
  [FlowIdentifiers.DIVIDEND_REINVESTING, FLOW_DIVIDEND_REINVESTING],
  [FlowIdentifiers.UPDATE_ADDRESS, FLOW_UPDATE_ADDRESS],
  [FlowIdentifiers.CHANGE_PASSWORD, FLOW_CHANGE_PASSWORD],
  [FlowIdentifiers.NAME, FLOW_CHANGE_NAME],
  [FlowIdentifiers.REMOVE_ACCOUNT, FLOW_REMOVE_ACCOUNT],
  [FlowIdentifiers.EMAIL_ADDRESS, FLOW_EMAIL_ADDRESS],
  [FlowIdentifiers.PHONE_NUMBER, FLOW_PHONE_NUMBER],
]);
