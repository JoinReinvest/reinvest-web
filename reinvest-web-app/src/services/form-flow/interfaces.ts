import { FC, ReactNode } from 'react';

import { FlowStep } from './flow-step';

export interface StepComponentProps<FormFields> {
  moveToNextStep: () => void;
  storeFields: FormFields;
  updateStoreFields: (fields: Partial<FormFields>) => void;
}

export interface FlowStepParams<FormFields> {
  Component: FC<StepComponentProps<FormFields>>;
  index: number;
  nextStep: FlowStep<FormFields> | null;
  previousStep: FlowStep<FormFields> | null;
  doesMeetConditionFields?: (fields: FormFields) => boolean;
  isAValidationView?: boolean;
  willBePartOfTheFlow?: (fields: FormFields) => boolean;
}

export type StepParams<FormFields> = Pick<FlowStepParams<FormFields>, 'Component' | 'isAValidationView' | 'doesMeetConditionFields' | 'willBePartOfTheFlow'>;

export type Steps<FormFields> = StepParams<FormFields>[];

export interface ContextStateMeta {
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface ContextState {
  CurrentStepView: FC;
  meta: ContextStateMeta;
  moveToNextValidStep: () => void;
  moveToPreviousValidStep: () => void;
  progressPercentage: number;
}

export interface ContextProviderProps<FormFields> {
  children: ReactNode;
  formFieldsInitialState: FormFields;
  steps: Steps<FormFields>;
  isResumable?: boolean;
  onFormFieldsUpdate?: (fields: FormFields) => Promise<void>;
}

export type CurrentFormStep<FormFields> = FlowStep<FormFields> | null;
