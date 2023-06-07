import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { InvestmentView } from 'views/investment';

import { BannedView } from '../BannedView';
import { AccountStats } from './components/AccountStats';
import { PostList } from './components/PostList';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const {
    activeAccount,
    activeAccountStatsMeta,
    isAccountBanned,
    updateActiveAccount,
    previousAccount,
    validateActiveAccountMeta,
    canOpenAccount,
    arrivesFromOnboarding,
  } = useActiveAccount();
  const [isInvestmentFlowOpen, toggleIsInvestmentFlowOpen] = useToggler(arrivesFromOnboarding);

  if (!isInvestmentFlowOpen && (activeAccountStatsMeta?.isLoading || validateActiveAccountMeta?.isLoading)) {
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
        possibleAddNewAccount={canOpenAccount}
      />
    );
  }

  return (
    <>
      <AccountStats toggleDisplayInitialInvestmentFlow={toggleIsInvestmentFlowOpen} />

      <PostList
        arePostsReady={arePostsReady}
        posts={posts}
      />

      <InvestmentView
        isModalOpen={isInvestmentFlowOpen}
        onModalOpenChange={toggleIsInvestmentFlowOpen}
        forInitialInvestment={!arrivesFromOnboarding}
        withSideModal={!arrivesFromOnboarding}
      />
    </>
  );
};
