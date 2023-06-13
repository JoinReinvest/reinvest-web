import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowChangeName } from './flow';

export const FLOW_CHANGE_NAME: SubFlow = {
  identifier: FlowIdentifiers.NAME,
  flow: <FlowChangeName />,
};
