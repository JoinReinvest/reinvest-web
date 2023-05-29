import { FlowIdentifiers } from './identifiers';
import { FlowMeta } from './interfaces';
import { FlowInvestmentFailed } from './investment-failed';
import { FlowManageDividends } from './manage-dividends';
import { FlowReferralReward } from './referral-reward';

export const FLOWS = new Map<FlowIdentifiers, FlowMeta>([
  [FlowIdentifiers.MANAGE_DIVIDENDS, FlowManageDividends],
  [FlowIdentifiers.REFERRAL_REWARD, FlowReferralReward],
  [FlowIdentifiers.INVESTMENT_FAILED, FlowInvestmentFailed],
]);
