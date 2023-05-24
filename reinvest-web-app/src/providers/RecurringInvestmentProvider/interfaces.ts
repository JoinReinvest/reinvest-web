import { useCreateInvestment } from './hooks/create-investment';
import { useDraftInvestment } from './hooks/draft-investment';
import { useInitiateInvestment } from './hooks/initiate-investment';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';

export interface State extends HookCreateInvestment, HookInitiateInvestment, HookSubscriptionAgreement, HookDraftInvestment {}

type HookCreateInvestment = ReturnType<typeof useCreateInvestment>;
type HookInitiateInvestment = ReturnType<typeof useInitiateInvestment>;
type HookSubscriptionAgreement = ReturnType<typeof useSubscriptionAgreement>;
type HookDraftInvestment = ReturnType<typeof useDraftInvestment>;
