import { IconSpinner } from 'assets/icons/IconSpinner';
import { useActiveInvestmentSummary } from 'hooks/active-investment-summary';
import { useAccountManagement } from 'providers/AccountManagement';
import { useEffect } from 'react';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

export function FlowInvestmentFailed() {
  const { setActiveInvestmentSummaryId } = useActiveInvestmentSummary();
  const { setQueryFlow } = useAccountManagement();
  const { notification } = useFlowsManagerContext();
  const investmentId = notification?.onObject?.id ?? null;

  useEffect(() => {
    if (investmentId) {
      setActiveInvestmentSummaryId(investmentId);
      setQueryFlow('MANAGE_BANK_ACCOUNT');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid h-full w-full place-items-center">
      <IconSpinner color="black" />
    </div>
  );
}
