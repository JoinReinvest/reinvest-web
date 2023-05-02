import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { useToggle } from 'usehooks-ts';
import { InitialInvestmentView } from 'views/initial-investment';
import { InitialInvestmentFormFlowProvider } from 'views/initial-investment/form-flow';

export const DashboardView = () => {
  const { arrivesFromOnboarding, setArrivesFromOnboarding } = useActiveAccount();
  // Display the initial investment flow if the user arrives from the onboarding flow
  const [displayInitialInvestmentFlow, toggleDisplayInitialInvestmentFlow] = useToggle(arrivesFromOnboarding);

  useEffect(() => {
    setArrivesFromOnboarding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InitialInvestmentFormFlowProvider initialStoreFields={{}}>
      <InitialInvestmentView
        isOpen={displayInitialInvestmentFlow}
        toggleIsOpen={toggleDisplayInitialInvestmentFlow}
      />
    </InitialInvestmentFormFlowProvider>
  );
};
