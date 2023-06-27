import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowChangeName } from './flow';

export const FLOW_CHANGE_BENEFICIARY_NAME: SubFlow = {
  identifier: FlowIdentifiers.BENEFICIARY_NAME,
  flow: <FlowChangeName />,
};
