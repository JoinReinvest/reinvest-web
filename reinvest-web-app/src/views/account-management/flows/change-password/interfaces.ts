export interface FlowFields {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
  _hasSucceded?: boolean;
  _wasCurrentPasswordIncorrect?: boolean;
}
