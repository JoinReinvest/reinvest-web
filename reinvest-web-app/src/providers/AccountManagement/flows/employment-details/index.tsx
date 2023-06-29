import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { Flow } from './flow';

export const FLOW_EMPLOYMENT_DETAILS: SubFlow = {
  identifier: FlowIdentifiers.EMPLOYMENT_DETAILS,
  flow: <Flow />,
};
