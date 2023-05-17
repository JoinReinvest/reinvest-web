import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { InitialInvestmentFormFlowProvider } from 'views/initial-investment/form-flow';
import { InvestmentFlowProvider } from 'views/investment/form-flow';

import { BankAccountFlow } from '../bank-account';
import { BankAccountFlowProvider } from '../bank-account/form-flow';
import { AccountStats } from './components/AccountStats';
import { PostList } from './components/PostList';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const { arrivesFromOnboarding, setArrivesFromOnboarding, activeAccountStatsMeta } = useActiveAccount();
  // Display the initial investment flow if the user arrives from the onboarding flow
  const [displayInitialInvestmentFlow, toggleDisplayInitialInvestmentFlow] = useToggler(arrivesFromOnboarding);

  useEffect(() => {
    setArrivesFromOnboarding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (activeAccountStatsMeta?.isLoading) {
    return (
      <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
        <IconSpinner color="black" />
      </div>
    );
  }

  return (
    <BankAccountFlowProvider initialStoreFields={{ _hasCompletedFlow: false, bankAccount: '' }}>
      <InitialInvestmentFormFlowProvider initialStoreFields={{}}>
        <InvestmentFlowProvider initialStoreFields={{}}>
          <AccountStats toggleDisplayInitialInvestmentFlow={toggleDisplayInitialInvestmentFlow} />

          <PostList
            arePostsReady={arePostsReady}
            posts={posts}
          />

          <BankAccountFlow
            isOpen={displayInitialInvestmentFlow}
            toggleIsOpen={toggleDisplayInitialInvestmentFlow}
          />
        </InvestmentFlowProvider>
      </InitialInvestmentFormFlowProvider>
    </BankAccountFlowProvider>
  );
};
