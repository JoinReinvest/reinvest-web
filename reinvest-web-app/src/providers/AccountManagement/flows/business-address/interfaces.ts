import { Address } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _currentAddress?: Address;
  _hasSucceded?: boolean;
  address?: Address;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  SUMMARY = 'SUMMARY',
  DETAILS = 'DETAILS',
  CONFIRMATION = 'CONFIRMATION',
}
