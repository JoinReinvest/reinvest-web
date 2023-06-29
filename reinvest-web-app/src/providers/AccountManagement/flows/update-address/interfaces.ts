import { Address } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _currentAddress?: Address;
  _hasSucceded?: boolean;
  address?: Address;
}
