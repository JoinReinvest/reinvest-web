import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowPhoneNumber } from './flow';

export const FLOW_PHONE_NUMBER: SubFlow = {
  identifier: FlowIdentifiers.PHONE_NUMBER,
  flow: <FlowPhoneNumber />,
};
