import { useCreateInvestment } from './hooks/create-investment';
import { useInvestmentSummary } from './hooks/investment-summary';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';

export interface State extends HookSubscriptionAgreement, HookUseCreateInvestment, HookUseInvestmentSummary {}

type HookUseCreateInvestment = ReturnType<typeof useCreateInvestment>;
type HookUseInvestmentSummary = ReturnType<typeof useInvestmentSummary>;
type HookSubscriptionAgreement = ReturnType<typeof useSubscriptionAgreement>;
