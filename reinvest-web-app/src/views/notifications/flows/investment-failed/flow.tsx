import { IconSpinner } from 'assets/icons/IconSpinner';
import { ButtonBack } from 'components/ButtonBack';
import { InvestmentSummaryDetails } from 'components/InvestmentSummaryDetails';
import { useInvestmentSummary } from 'hooks/investment-summary';
import { useNotifications } from 'providers/Notifications';
import { useEffect } from 'react';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

export function FlowInvestmentFailed() {
  const { notification } = useFlowsManagerContext();
  const { markAsRead } = useNotifications();
  const investmentId = notification?.onObject?.id ?? null;
  const { investment, investmentMeta } = useInvestmentSummary({ investmentId });

  useEffect(() => {
    async function markNotificationAsRead() {
      if (notification?.id) {
        await markAsRead({ notificationId: notification.id });
      }
    }

    markNotificationAsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (investmentMeta.isLoading) {
    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16">
      <ButtonBack />

      <InvestmentSummaryDetails investment={investment} />
    </div>
  );
}
