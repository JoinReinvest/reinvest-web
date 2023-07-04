import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { Flow } from './flow';

export const FLOW_BUSINESS_ADDRESS: SubFlow = {
  identifier: FlowIdentifiers.BUSINESS_ADDRESS,
  flow: <Flow />,
};
