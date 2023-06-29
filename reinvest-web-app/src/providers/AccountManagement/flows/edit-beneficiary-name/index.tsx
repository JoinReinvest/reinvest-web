import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowChangeName } from './flow';

export const FLOW_CHANGE_BENEFICIARY_NAME: SubFlow = {
  identifier: FlowIdentifiers.BENEFICIARY_NAME,
  flow: <FlowChangeName />,
};
