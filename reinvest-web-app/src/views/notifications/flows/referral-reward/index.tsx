import { FlowIdentifiers } from '../identifiers';
import { FlowMeta } from '../interfaces';
import { FlowReferralReward as Flow } from './flow';

export const FlowReferralReward: FlowMeta = {
  identifier: FlowIdentifiers.REFERRAL_REWARD,
  modalTitle: 'Referral Reward',
  Component: <Flow />,
};
