import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowFundsWithdrawal } from './flow';

export const FLOW_FUNDS_WITHDRAWAL: SubFlow = {
  identifier: FlowIdentifiers.WITHDRAW_FUNDS,
  flow: <FlowFundsWithdrawal />,
  selfManagesModal: true,
};
