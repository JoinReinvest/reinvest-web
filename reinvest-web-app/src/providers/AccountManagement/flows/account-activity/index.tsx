import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowAccountActivity } from './flow';

export const FLOW_ACCOUNT_ACTIVITY: SubFlow = {
  identifier: FlowIdentifiers.ACCOUNT_ACTIVITY,
  flow: <FlowAccountActivity />,
  selfManagesModal: true,
};
