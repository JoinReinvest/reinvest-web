import { IconSpinner } from 'assets/icons/IconSpinner';
import { PROPERTY } from 'constants/portfolio-properties';
import { usePortfolio } from 'providers/Portfolio';
import { useMemo } from 'react';

import { Header } from './components/Header';
import { PropertyMetrics } from './components/PropertyMetrics';
import { SectionNeighborhood } from './components/SectionNeighborhood';
import { SectionUpdates } from './components/SectionUpdates';
import { InvestmentFlowProvider } from './providers/InvestmentFlow';

interface Props {
  propertyIndex: number;
}

export const PortfolioPropertyView = ({ propertyIndex }: Props) => {
  const { getProperty } = usePortfolio();

  const property = useMemo(() => getProperty(propertyIndex), [getProperty, propertyIndex]);

  if (!property) {
    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner />
      </div>
    );
  }

  return (
    <InvestmentFlowProvider>
      <div className="flex flex-col gap-32">
        <Header property={property} />

        <PropertyMetrics property={property} />

        <div className="flex flex-col gap-32 md:flex-row md:gap-27">
          <SectionNeighborhood property={property} />

          <SectionUpdates updates={PROPERTY.updates} />
        </div>
      </div>
    </InvestmentFlowProvider>
  );
};
