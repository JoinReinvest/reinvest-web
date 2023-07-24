import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlogPostInterface } from 'components/Education/BlogCard';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { InvestmentView } from 'views/investment';

import { BannedView } from '../BannedView';
import { AccountStats } from './components/AccountStats';
import { PostList } from './components/PostList';
import { InformationModalsProvider } from './providers/InformationModals';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

const PLACEHOLDER = '{}';
const TITLE_BANNED = 'Your {} account has been locked.';

export const DashboardView = ({ posts, arePostsReady }: Props) => {
  const { activeAccount, activeAccountStatsMeta, updateActiveAccount, previousAccount, validateActiveAccountMeta, canOpenAccount, arrivesFromOnboarding } =
    useActiveAccount();
  const [isInvestmentFlowOpen, toggleIsInvestmentFlowOpen] = useToggler(arrivesFromOnboarding);

  if (!isInvestmentFlowOpen && (activeAccountStatsMeta?.isLoading || validateActiveAccountMeta?.isLoading)) {
    return (
      <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
        <IconSpinner color="black" />
      </div>
    );
  }

  if (activeAccount?.isBanned) {
    const accountType = activeAccount?.type?.toLowerCase() ?? AccountType.Individual.toLowerCase();
    const title = TITLE_BANNED.replace(PLACEHOLDER, accountType);

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
    <InformationModalsProvider>
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
    </InformationModalsProvider>
  );
};
