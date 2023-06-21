import { PROPERTY } from 'constants/portfolio-properties';

import { Header } from './components/Header';
import { PropertyMetrics } from './components/PropertyMetrics';
import { SectionNeighborhood } from './components/SectionNeighborhood';
import { SectionUpdates } from './components/SectionUpdates';
import { InvestmentFlowProvider } from './providers/InvestmentFlow';

export const PortfolioPropertyView = () => {
  return (
    <InvestmentFlowProvider>
      <div className="flex flex-col gap-32">
        <Header property={PROPERTY} />

        <PropertyMetrics
          address={PROPERTY.address}
          metrics={PROPERTY.meta.metrics}
        />

        <div className="flex flex-col gap-32 md:flex-row md:gap-27">
          <SectionNeighborhood property={PROPERTY} />

          <SectionUpdates updates={PROPERTY.updates} />
        </div>
      </div>
    </InvestmentFlowProvider>
  );
};
