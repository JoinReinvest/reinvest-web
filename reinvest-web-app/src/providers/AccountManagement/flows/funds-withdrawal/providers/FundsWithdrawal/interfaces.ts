import { useAbortRequest } from './hooks/abort-request';
import { useCurrentRequest } from './hooks/current-request';
import { useSimulation } from './hooks/simulation';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';

export interface State extends HookAbortRequest, HookCurrentRequest, HookSimulation, HookSubscriptionAgreement {}

type HookAbortRequest = ReturnType<typeof useAbortRequest>;
type HookCurrentRequest = ReturnType<typeof useCurrentRequest>;
type HookSimulation = ReturnType<typeof useSimulation>;
type HookSubscriptionAgreement = ReturnType<typeof useSubscriptionAgreement>;
