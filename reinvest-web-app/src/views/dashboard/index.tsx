import { IconEmptyCalendar } from 'assets/icons/Dashboard/IconEmptyCalendar';
import { Button } from 'components/Button';
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

const MESSAGE_EMPTY_CHART = 'Make an investment now for generating the chart';

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
        <div className="lg:flex lg:w-full lg:max-w-330 lg:flex-col lg:justify-between">
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
          <PositionTotal className="hidden lg:block" />
          <NetReturns className="hidden lg:block" />
          <Button
            label="Invest"
            className="hidden lg:mt-8 lg:block"
          />
        </div>
        <div className="flex flex-col gap-8 border border-gray-04 px-72 py-36 lg:w-full lg:justify-center lg:gap-24 lg:py-160">
          <IconEmptyCalendar className="lg:max-w-342 mx-auto h-115 w-100 lg:h-full lg:max-h-300 lg:w-full" />
          <Typography
            variant="paragraph-emphasized"
            className="text-center text-gray-02 lg:hidden"
          >
            {MESSAGE_EMPTY_CHART}
          </Typography>
          <Typography
            variant="h6"
            className="hidden text-center text-gray-02 lg:block"
          >
            {MESSAGE_EMPTY_CHART}
          </Typography>
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
