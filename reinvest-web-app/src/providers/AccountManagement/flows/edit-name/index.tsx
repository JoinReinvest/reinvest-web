import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowChangeName } from './flow';

export const FLOW_CHANGE_NAME: SubFlow = {
  identifier: FlowIdentifiers.NAME,
  flow: <FlowChangeName />,
};
