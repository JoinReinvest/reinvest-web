import { usePortfolioDetails } from './hooks/portfolio-details';
import { useProperties } from './hooks/properties';

export interface State extends HookPortfolioDetails, HookProperties {}

type HookPortfolioDetails = ReturnType<typeof usePortfolioDetails>;
type HookProperties = ReturnType<typeof useProperties>;
