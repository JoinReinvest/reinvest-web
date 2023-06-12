import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowChangePassword } from './flow';

export const FLOW_CHANGE_PASSWORD: SubFlow = {
  identifier: FlowIdentifiers.CHANGE_PASSWORD,
  flow: <FlowChangePassword />,
};
