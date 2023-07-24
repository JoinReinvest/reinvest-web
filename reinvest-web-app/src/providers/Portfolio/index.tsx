import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { usePortfolioDetails } from './hooks/portfolio-details';
import { usePortfolioUpdates } from './hooks/portfolio-updates';
import { useProperties } from './hooks/properties';

const PROVIDER_NAME = 'PortfolioProvider';

export const usePortfolio = createContextConsumer(Context, PROVIDER_NAME);

export function PortfolioProvider({ children }: PropsWithChildren) {
  const portfolioDetails = usePortfolioDetails();
  const properties = useProperties(portfolioDetails);
  const portfolioUpdates = usePortfolioUpdates();

  return <Context.Provider value={{ ...portfolioDetails, ...properties, ...portfolioUpdates }}>{children}</Context.Provider>;
}
