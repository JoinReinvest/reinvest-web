import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowChangeAvatar } from './flow';

export const FLOW_CHANGE_AVATAR: SubFlow = {
  identifier: FlowIdentifiers.CHANGE_AVATAR,
  flow: <FlowChangeAvatar />,
};
