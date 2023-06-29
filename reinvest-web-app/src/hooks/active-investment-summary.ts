import { StorageKeys } from 'constants/session-storage';
import { useSessionStorage } from 'usehooks-ts';

interface Returns {
  activeInvestmentSummaryId: string | null;
  setActiveInvestmentSummaryId: (state: string | null) => void;
}

/**
 * Useful to move from the failed investment notification
 * to the manage account's investment history.
 */
export function useActiveInvestmentSummary(): Returns {
  const [activeInvestmentSummaryId, setActiveInvestmentSummaryId] = useSessionStorage<string | null>(StorageKeys.ACTIVE_INVESTMENT_SUMMARY, null);

  return { activeInvestmentSummaryId, setActiveInvestmentSummaryId };
}
