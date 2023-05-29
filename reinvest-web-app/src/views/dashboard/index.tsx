import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { useStaticState } from 'hooks/static-state';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
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
    latestAccountOnboardedId,
    activeAccount,
    deprecateLatestAccountOnboarded,
    activeAccountStatsMeta,
    isAccountBanned,
    updateActiveAccount,
    previousAccount,
    validateActiveAccountMeta,
    allAccounts,
  } = useActiveAccount();
  const [hadArrivedFromOnboarding, setHadArrivedFromOnboarding] = useStaticState(!!latestAccountOnboardedId);
  const [isInvestmentFlowOpen, toggleIsInvestmentFlowOpen] = useToggler(!!latestAccountOnboardedId);

  useEffect(() => {
    deprecateLatestAccountOnboarded();
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
        possibleAddNewAccount={allAccounts.length < 2}
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
        forInitialInvestment={hadArrivedFromOnboarding}
        setHadArrivedFromOnboarding={setHadArrivedFromOnboarding}
      />
    </>
  );
};
