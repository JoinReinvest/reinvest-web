import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowAccountActivity } from './flow';

export const FLOW_ACCOUNT_ACTIVITY: SubFlow = {
  identifier: FlowIdentifiers.ACCOUNT_ACTIVITY,
  flow: <FlowAccountActivity />,
  selfManagesModal: true,
};
