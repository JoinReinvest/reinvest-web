import { IconSpinner } from 'assets/icons/IconSpinner';
import { ButtonBack } from 'components/ButtonBack';
import { InvestmentSummaryDetails } from 'components/InvestmentSummaryDetails';
import { useInvestmentSummary } from 'hooks/investment-summary';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

export function FlowInvestmentFailed() {
  const { notification } = useFlowsManagerContext();
  const investmentId = notification?.onObject?.id ?? null;
  const { investment, investmentMeta } = useInvestmentSummary({ investmentId });

  if (investmentMeta.isLoading) {
    <div className="grid h-full w-full place-items-center">
      <IconSpinner color="black" />
    </div>;
  }

  return (
    <div className="flex flex-col gap-16">
      <ButtonBack />

      <InvestmentSummaryDetails investment={investment} />
    </div>
  );
}
