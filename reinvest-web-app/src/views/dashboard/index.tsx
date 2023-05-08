import { Button } from 'components/Button';
import { AreaChart } from 'components/Charts/AreaChart';
import { NetReturns } from 'components/Dashboard/NetReturns';
import { PositionTotal } from 'components/Dashboard/PositionTotal';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { Typography } from 'components/Typography';
import { renderBlogCard } from 'pages/education';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { useToggle } from 'usehooks-ts';
import { InitialInvestmentView } from 'views/initial-investment';
import { InitialInvestmentFormFlowProvider } from 'views/initial-investment/form-flow';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const { arrivesFromOnboarding, setArrivesFromOnboarding } = useActiveAccount();
  // Display the initial investment flow if the user arrives from the onboarding flow
  const [displayInitialInvestmentFlow, toggleDisplayInitialInvestmentFlow] = useToggle(arrivesFromOnboarding);

  useEffect(() => {
    setArrivesFromOnboarding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InitialInvestmentFormFlowProvider initialStoreFields={{}}>
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
            className="hidden lg:mt-16 lg:block"
          />
        </div>
        <div className="flex h-180 flex-col gap-8 border border-gray-04 lg:h-auto lg:w-full lg:gap-24">
          <AreaChart />
        </div>

        <Button
          label="Invest"
          className="lg:hidden"
        />
        <PositionTotal className="lg:hidden" />
        <NetReturns className="lg:hidden" />
      </div>
      {arePostsReady && <div className="mt-16 flex flex-col gap-16 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-y-36">{posts.map(renderBlogCard)}</div>}

      <InitialInvestmentView
        isOpen={displayInitialInvestmentFlow}
        toggleIsOpen={toggleDisplayInitialInvestmentFlow}
      />
    </InitialInvestmentFormFlowProvider>
  );
};
