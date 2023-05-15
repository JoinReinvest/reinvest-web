import { ActiveAccountConfigurationProvider } from 'providers/ActiveAccountConfigurationProvider';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { PropsWithChildren } from 'react';
import { BeneficiaryCreationFlowProvider } from 'views/beneficiary-creation';

import { Header } from './components/Header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <ActiveAccountProvider>
      <ActiveAccountConfigurationProvider>
        <BeneficiaryCreationFlowProvider initialStoreFields={{}}>
          <Header />

          <main className="container mx-auto pb-20 pt-80 lg:pt-100">{children}</main>
        </BeneficiaryCreationFlowProvider>
      </ActiveAccountConfigurationProvider>
    </ActiveAccountProvider>
  );
};
