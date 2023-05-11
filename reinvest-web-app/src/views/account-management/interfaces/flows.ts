import { ContextProvider } from 'reinvest-app-common/src/services/form-flow';

import { MenuItemIdentifiers } from '../enums/menu';

export type SubFlowsByIdentifier = Record<MenuItemIdentifiers, SubFlow<unknown>>;

export interface SubFlow<FormFields> {
  identifier: MenuItemIdentifiers;
  provider: ContextProvider<FormFields>;
}
