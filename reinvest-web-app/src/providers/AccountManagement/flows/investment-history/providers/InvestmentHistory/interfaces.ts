import { useCancelInvestment } from './hooks/cancel-investment';
import { useInvestmentsList } from './hooks/investments-list';

export interface State extends HookCancelInvestment, HookInvestmentHistory {}

type HookCancelInvestment = ReturnType<typeof useCancelInvestment>;
type HookInvestmentHistory = ReturnType<typeof useInvestmentsList>;
