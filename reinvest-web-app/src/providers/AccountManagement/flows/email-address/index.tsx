import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowEmailAddress } from './flow';

export const FLOW_EMAIL_ADDRESS: SubFlow = {
  identifier: FlowIdentifiers.EMAIL_ADDRESS,
  flow: <FlowEmailAddress />,
};
