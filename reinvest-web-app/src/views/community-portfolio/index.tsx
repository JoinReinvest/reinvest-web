import { IconSpinner } from 'assets/icons/IconSpinner';
import { usePortfolio } from 'providers/Portfolio';
import { InvestmentView } from 'views/investment';

import { Header } from './components/Header';
import { PropertiesList } from './components/PropertiesList';
import { ModalManagerProvider, useModalManager } from './providers/ModalManager';

export function InnerCommunityPortfolioView() {
  const { properties, portfolioMeta } = usePortfolio();
  const { isInvestmentModalOpen, onInvestmentModalOpenChange } = useModalManager();

  if (portfolioMeta?.isLoading) {
    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-24">
        <Header />

        <PropertiesList properties={properties} />
      </div>

      <InvestmentView
        isModalOpen={isInvestmentModalOpen}
        onModalOpenChange={onInvestmentModalOpenChange}
        forInitialInvestment
        withSideModal
      />
    </>
  );
}

export const CommunityPortfolioView = () => (
  <ModalManagerProvider>
    <InnerCommunityPortfolioView />
  </ModalManagerProvider>
);
