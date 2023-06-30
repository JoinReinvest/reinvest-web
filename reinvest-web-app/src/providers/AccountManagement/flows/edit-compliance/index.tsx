import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowChangeCompliance } from './flow';

export const FLOW_CHANGE_COMPLIANCE: SubFlow = {
  identifier: FlowIdentifiers.NAME,
  flow: <FlowChangeCompliance />,
};
