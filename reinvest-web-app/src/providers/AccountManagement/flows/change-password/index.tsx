import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowChangePassword } from './flow';

export const FLOW_CHANGE_PASSWORD: SubFlow = {
  identifier: FlowIdentifiers.CHANGE_PASSWORD,
  flow: <FlowChangePassword />,
};
