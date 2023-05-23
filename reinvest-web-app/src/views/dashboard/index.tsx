import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { InitialInvestmentFormFlowProvider } from 'views/initial-investment/form-flow';
import { InvestmentFlowProvider } from 'views/investment/form-flow';

import { BankAccountFlow } from '../bank-account';
import { BankAccountFlowProvider } from '../bank-account/form-flow';
import { BannedView } from '../BannedView';
import { InitialInvestmentView } from '../initial-investment';
import { AccountStats } from './components/AccountStats';
import { PostList } from './components/PostList';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

const initialStoreFields = { _hasCompletedFlow: false, bankAccount: '' };

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const {
    arrivesFromOnboarding,
    activeAccount,
    setArrivesFromOnboarding,
    activeAccountStatsMeta,
    isAccountBanned,
    updateActiveAccount,
    previousAccount,
    validateActiveAccountMeta,
  } = useActiveAccount();
  // Display the initial investment flow if the user arrives from the onboarding flow
  const [displayInitialInvestmentFlow, toggleDisplayInitialInvestmentFlow] = useToggler(arrivesFromOnboarding);

  useEffect(() => {
    setArrivesFromOnboarding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (activeAccountStatsMeta?.isLoading || validateActiveAccountMeta?.isLoading) {
    return (
      <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
        <IconSpinner color="black" />
      </div>
    );
  }

  if (isAccountBanned) {
    const title = `Your ${activeAccount?.type?.toLowerCase() || AccountType.Individual.toLowerCase()} account has been locked.`;

    return (
      <BannedView
        isOpen
        title={title}
        onOpenChange={() => updateActiveAccount(previousAccount)}
      />
    );
  }

  return (
    <BankAccountFlowProvider initialStoreFields={{ _hasCompletedFlow: false, bankAccount: '' }}>
      <InitialInvestmentFormFlowProvider initialStoreFields={initialStoreFields}>
        <InvestmentFlowProvider initialStoreFields={initialStoreFields}>
          <AccountStats toggleDisplayInitialInvestmentFlow={toggleDisplayInitialInvestmentFlow} />

          <PostList
            arePostsReady={arePostsReady}
            posts={posts}
          />

          <BankAccountFlow
            isOpen={displayInitialInvestmentFlow}
            toggleIsOpen={toggleDisplayInitialInvestmentFlow}
          />

          <InitialInvestmentView
            isOpen={displayInitialInvestmentFlow}
            toggleIsOpen={toggleDisplayInitialInvestmentFlow}
          />
        </InvestmentFlowProvider>
      </InitialInvestmentFormFlowProvider>
    </BankAccountFlowProvider>
  );
};
