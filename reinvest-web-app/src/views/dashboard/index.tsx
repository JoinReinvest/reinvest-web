import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect, useRef } from 'react';
import { BankAccountFlow } from 'views/bank-account';
import { BankAccountFlowProvider } from 'views/bank-account/form-flow';
import { InitialInvestmentView } from 'views/initial-investment';
import { InitialInvestmentFormFlowProvider } from 'views/initial-investment/form-flow';

import { AccountStats } from './components/AccountStats';
import { PostList } from './components/PostList';
import { INITIAL_STORE_FIELDS } from './constants';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const { arrivesFromOnboarding, setArrivesFromOnboarding, activeAccountStatsMeta } = useActiveAccount();
  const hadArrivedFromOnboarding = useRef(arrivesFromOnboarding);
  const [isInvestmentFlowOpen, toggleIsInvestmentFlowOpen] = useToggler(arrivesFromOnboarding);

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
      <InitialInvestmentFormFlowProvider initialStoreFields={INITIAL_STORE_FIELDS}>
        <AccountStats toggleDisplayInitialInvestmentFlow={toggleIsInvestmentFlowOpen} />

        <PostList
          arePostsReady={arePostsReady}
          posts={posts}
        />

        <BankAccountFlow
          isOpen={isInvestmentFlowOpen}
          toggleIsOpen={toggleIsInvestmentFlowOpen}
        />

        <InitialInvestmentView
          isModalOpen={isInvestmentFlowOpen}
          onModalOpenChange={toggleIsInvestmentFlowOpen}
          forInitialInvestment={hadArrivedFromOnboarding.current}
        />
      </InitialInvestmentFormFlowProvider>
    </BankAccountFlowProvider>
  );
};
