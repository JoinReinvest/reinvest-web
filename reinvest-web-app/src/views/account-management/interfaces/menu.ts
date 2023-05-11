import { MenuGroupIdentifiers, MenuItemIdentifiers } from '../enums/menu';

export interface MenuGroup {
  identifier: MenuGroupIdentifiers;
  items: MenuItem[];
  label: string;
}

export interface MenuItem {
  identifier: MenuItemIdentifiers;
  label: string;
}
