import { Button } from 'components/Button';
import { NetReturns } from 'components/Dashboard/NetReturns';
import { PositionTotal } from 'components/Dashboard/PositionTotal';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { renderBlogCard } from 'pages/education';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { InitialInvestmentFormFlowProvider } from 'views/initial-investment/form-flow';
import { InvestmentFlowProvider } from 'views/investment/form-flow';

import {InitialInvestmentView} from "../initial-investment";

import { EvsChart } from './components/EvsChart';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const { arrivesFromOnboarding, setArrivesFromOnboarding } = useActiveAccount();
  // Display the initial investment flow if the user arrives from the onboarding flow
  const [displayInitialInvestmentFlow, toggleDisplayInitialInvestmentFlow] = useToggler(arrivesFromOnboarding);

  useEffect(() => {
    setArrivesFromOnboarding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <InitialInvestmentFormFlowProvider initialStoreFields={{ _hasCompletedFlow: false, bankAccount: '' }}>
        <InvestmentFlowProvider initialStoreFields={{}}>
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
            <div className="lg:flex lg:w-full lg:max-w-330 lg:flex-col lg:justify-between lg:gap-8">
              <Typography
                variant="h3"
                className="hidden lg:block"
              >
                Dashboard
              </Typography>
              <Typography variant="h2">$0.00</Typography>
              <Typography
                variant="paragraph-emphasized"
                className="mt-8 text-gray-02 lg:mt-0"
              >
                Account Value
              </Typography>
              <PositionTotal className="hidden lg:mt-8 lg:block" />
              <NetReturns className="hidden lg:mt-8 lg:block" />
              <Button
                label="Invest"
                onClick={() => toggleDisplayInitialInvestmentFlow()}
                className="hidden lg:mt-16 lg:block"
              />
            </div>

            <EvsChart />

            <Button
              label="Invest"
              className="lg:hidden"
              onClick={() => toggleDisplayInitialInvestmentFlow()}
            />
            <PositionTotal className="lg:hidden" />
            <NetReturns className="lg:hidden" />
          </div>
          {arePostsReady && <div className="mt-16 flex flex-col gap-16 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-y-36">{posts.map(renderBlogCard)}</div>}

          <InitialInvestmentView
            isOpen={displayInitialInvestmentFlow}
            toggleIsOpen={toggleDisplayInitialInvestmentFlow}
          />
        </InvestmentFlowProvider>
      </InitialInvestmentFormFlowProvider>
  );
};
