import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowUpdateAddress } from './flow';

export const FLOW_UPDATE_BUSINESS_ADDRESS: SubFlow = {
  identifier: FlowIdentifiers.BUSINESS_ADDRESS,
  flow: <FlowUpdateAddress />,
};
