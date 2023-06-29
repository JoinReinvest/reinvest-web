import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowUpdateAddress } from './flow';

export const FLOW_UPDATE_ADDRESS: SubFlow = {
  identifier: FlowIdentifiers.UPDATE_ADDRESS,
  flow: <FlowUpdateAddress />,
};
