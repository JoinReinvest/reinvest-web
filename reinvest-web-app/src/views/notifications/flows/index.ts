import { FlowIdentifiers } from './identifiers';
import { FlowMeta } from './interfaces';
import { FlowManageDividends } from './manage-dividends';

export const FLOWS = new Map<FlowIdentifiers, FlowMeta>([[FlowIdentifiers.MANAGE_DIVIDENDS, FlowManageDividends]]);
