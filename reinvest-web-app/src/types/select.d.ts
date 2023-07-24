import { ReactNode } from 'react';
import { GroupBase } from 'react-select';

declare module 'react-select/dist/declarations/src/Select' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    dropdownIcon?: ReactNode;
    formatSelectedOptionLabel?: (option: Option) => ReactNode;
  }
}
