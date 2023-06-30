import { Industry } from 'reinvest-app-common/src/constants/industries';
import { EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  employmentDetails?: {
    employerName?: string;
    industry?: Industry;
    occupation?: string;
  };
  employmentStatus?: EmploymentStatus;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  EMPLOYMENT_STATUS = 'EMPLOYMENT_STATUS',
  EMPLOYMENT_DETAILS = 'EMPLOYMENT_DETAILS',
  CONFIRMATION = 'CONFIRMATION',
}
