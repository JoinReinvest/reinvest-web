import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowEmailAddress } from './flow';

export const FLOW_EMAIL_ADDRESS: SubFlow = {
  identifier: FlowIdentifiers.EMAIL_ADDRESS,
  flow: <FlowEmailAddress />,
};
