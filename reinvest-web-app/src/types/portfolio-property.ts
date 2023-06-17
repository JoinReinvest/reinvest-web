// TO-DO: Deprecate and use API once the properties endpoints
// are available.

import { Address } from 'reinvest-app-common/src/types/graphql';

import { Coordinates } from './maps';

export interface PropertyDetails {
  address: Address;
  characteristics: PropertyCharacteristic[];
  id: string;
  location: Coordinates;
  meta: PropertyMeta;
  updates: PropertyUpdate[];
}

export enum PropertyCharacteristicType {
  education = 'education',
  transport = 'transport',
}

export interface PropertyUpdate {
  author: PropertyUpdateAuthor;
  content: PropertyUpdateContent;
  date: string;
}

interface PropertyUpdateAuthor {
  initials: string;
  uri: string;
}

interface PropertyUpdateContent {
  info: string;
  image?: string;
}

interface PropertyCharacteristic {
  info: string;
  type: PropertyCharacteristicType;
  value: string;
}

interface PropertyMeta {
  images: string[];
  metrics: {
    impact: PropertyMetaMetricsImpact;
    key: PropertyMetaMetricsKey;
  };
  thumbnail: string;
}

interface PropertyMetaMetricsKey {
  projectReturn: string;
  rating: string;
  structure: string;
}

interface PropertyMetaMetricsImpact {
  jobsCreated: string;
  totalProjectSize: string;
  units: string;
}
