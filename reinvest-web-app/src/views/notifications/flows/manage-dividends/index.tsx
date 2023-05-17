import { FlowIdentifiers } from '../identifiers';
import { FlowMeta } from '../interfaces';
import { FlowManageDividends as Flow } from './flow';

export const FlowManageDividends: FlowMeta = {
  identifier: FlowIdentifiers.MANAGE_DIVIDENDS,
  modalTitle: 'Dividends',
  Component: <Flow />,
};
