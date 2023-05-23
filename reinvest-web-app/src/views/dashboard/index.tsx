import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { BankAccountFlow } from 'views/bank-account';
import { BankAccountFlowProvider } from 'views/bank-account/form-flow';
import { InitialInvestmentView } from 'views/initial-investment';
import { InitialInvestmentFormFlowProvider } from 'views/initial-investment/form-flow';

import { AccountStats } from './components/AccountStats';
import { PostList } from './components/PostList';
import { useInvestmentStoreFields } from './hooks/investment-store-fields';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const { initialStoreFields } = useInvestmentStoreFields();
  const { arrivesFromOnboarding, activeAccountStatsMeta } = useActiveAccount();
  const [isInvestmentFlowOpen, toggleIsInvestmentFlowOpen] = useToggler(arrivesFromOnboarding);

  if (activeAccountStatsMeta?.isLoading) {
    return (
      <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
        <IconSpinner color="black" />
      </div>
    );
  }

  return (
    <BankAccountFlowProvider initialStoreFields={{ _hasCompletedFlow: false, bankAccount: '' }}>
      <InitialInvestmentFormFlowProvider initialStoreFields={initialStoreFields}>
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
        />
      </InitialInvestmentFormFlowProvider>
    </BankAccountFlowProvider>
  );
};
