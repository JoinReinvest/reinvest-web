import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowPhoneNumber } from './flow';

export const FLOW_PHONE_NUMBER: SubFlow = {
  identifier: FlowIdentifiers.PHONE_NUMBER,
  flow: <FlowPhoneNumber />,
};
