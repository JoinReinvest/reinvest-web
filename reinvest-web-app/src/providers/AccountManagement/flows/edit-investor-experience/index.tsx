import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowChangeInvestorExperience } from './flow';

export const FLOW_EDIT_INVESTOR_EXPERIENCE_FLOW: SubFlow = {
  identifier: FlowIdentifiers.EXPERIENCE,
  flow: <FlowChangeInvestorExperience />,
};
