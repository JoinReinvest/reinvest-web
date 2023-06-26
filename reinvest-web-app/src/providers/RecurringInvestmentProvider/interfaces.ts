import { useActiveInvestment } from './hooks/active-investment';
import { useCreateInvestment } from './hooks/create-investment';
import { useDeactivateInvestment } from './hooks/deactivate-investment';
import { useDraftInvestment } from './hooks/draft-investment';
import { useInitiateInvestment } from './hooks/initiate-investment';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';
import { useUnsuspendInvestment } from './hooks/unsuspend-investment';

export interface State
  extends HookCreateInvestment,
    HookInitiateInvestment,
    HookSubscriptionAgreement,
    HookDraftInvestment,
    HookActiveInvestment,
    HookDeactivateInvestment,
    HookUnsuspendInvestment {
  toggleEnableDraftQuery: (state: boolean) => void;
}

type HookCreateInvestment = ReturnType<typeof useCreateInvestment>;
type HookInitiateInvestment = ReturnType<typeof useInitiateInvestment>;
type HookSubscriptionAgreement = ReturnType<typeof useSubscriptionAgreement>;
type HookDraftInvestment = ReturnType<typeof useDraftInvestment>;
type HookActiveInvestment = ReturnType<typeof useActiveInvestment>;
type HookDeactivateInvestment = ReturnType<typeof useDeactivateInvestment>;
type HookUnsuspendInvestment = ReturnType<typeof useUnsuspendInvestment>;
