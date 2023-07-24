import { DomicileType } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  birthCountry?: string;
  citizenshipCountry?: string;
  type?: DomicileType;
  visaType?: string;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  CURRENT_DOMICILE = 'CURRENT_DOMICILE',
  DOMICILE_TYPE = 'DOMICILE_TYPE',
  DOMICILE_GREEN_CARD = 'DOMICILE_GREEN_CARD',
  DOMICILE_VISA = 'DOMICILE_VISA',
  CONFIRMATION = 'CONFIRMATION',
}
