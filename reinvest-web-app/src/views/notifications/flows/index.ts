import { FlowIdentifiers } from './identifiers';
import { FlowMeta } from './interfaces';
import { FlowManageDividends } from './manage-dividends';
import { FlowReferralReward } from './referral-reward';

export const FLOWS = new Map<FlowIdentifiers, FlowMeta>([
  [FlowIdentifiers.MANAGE_DIVIDENDS, FlowManageDividends],
  [FlowIdentifiers.REFERRAL_REWARD, FlowReferralReward],
]);
