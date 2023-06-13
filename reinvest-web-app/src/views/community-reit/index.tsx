import { InvestmentView } from 'views/investment';

import { Header } from './components/Header';
import { PropertiesList } from './components/PropertiesList';
import { PROPERTIES } from './constants';
import { ModalManagerProvider, useModalManager } from './providers/ModalManager';

export function InnerCommunityREITView() {
  const { isInvestmentModalOpen, onInvestmentModalOpenChange } = useModalManager();

  return (
    <>
      <div className="flex flex-col gap-24">
        <Header />

        <PropertiesList properties={PROPERTIES} />
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

export const CommunityREITView = () => (
  <ModalManagerProvider>
    <InnerCommunityREITView />
  </ModalManagerProvider>
);
