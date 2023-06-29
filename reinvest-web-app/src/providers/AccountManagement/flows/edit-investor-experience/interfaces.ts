import { Experience } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _currentExperience?: Experience;
  _hasSucceded?: boolean;
  newExperience?: Experience;
}
