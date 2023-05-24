import { FlowIdentifiers } from '../enums/flow';
import { MenuGroupIdentifiers } from '../enums/menu';

export interface MenuGroup {
  identifier: MenuGroupIdentifiers;
  items: MenuItem[];
  label: string;
}

export interface MenuItem {
  identifier: FlowIdentifiers;
  label: string;
}
