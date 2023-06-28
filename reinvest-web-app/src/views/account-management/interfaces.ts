import { FlowIdentifiers } from 'providers/AccountManagement/enums';

import { MenuGroupIdentifiers } from './enums';

export interface MenuGroup {
  identifier: MenuGroupIdentifiers;
  items: MenuItem[];
  label: string;
}

export interface MenuItem {
  identifier: FlowIdentifiers;
  label: string;
}
