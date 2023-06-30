import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowFundsWithdrawal } from './flow';

export const FLOW_FUNDS_WITHDRAWAL: SubFlow = {
  identifier: FlowIdentifiers.WITHDRAW_FUNDS,
  flow: <FlowFundsWithdrawal />,
  selfManagesModal: true,
};
