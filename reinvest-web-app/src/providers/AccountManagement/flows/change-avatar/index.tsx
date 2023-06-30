import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowChangeAvatar } from './flow';

export const FLOW_CHANGE_AVATAR: SubFlow = {
  identifier: FlowIdentifiers.CHANGE_AVATAR,
  flow: <FlowChangeAvatar />,
};
