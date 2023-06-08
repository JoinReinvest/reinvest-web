import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowUpdateAddress } from './flow';

export const FLOW_UPDATE_ADDRESS: SubFlow = {
  identifier: FlowIdentifiers.UPDATE_ADDRESS,
  flow: <FlowUpdateAddress />,
};
