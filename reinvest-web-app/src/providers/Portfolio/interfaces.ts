import { usePortfolioDetails } from './hooks/portfolio-details';
import { usePortfolioUpdates } from './hooks/portfolio-updates';
import { useProperties } from './hooks/properties';

export interface State extends HookPortfolioDetails, HookProperties, HookPortfolioUpdates {}

type HookPortfolioDetails = ReturnType<typeof usePortfolioDetails>;
type HookProperties = ReturnType<typeof useProperties>;
type HookPortfolioUpdates = ReturnType<typeof usePortfolioUpdates>;
