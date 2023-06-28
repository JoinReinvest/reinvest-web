export interface FlowFields {
  _phoneNumber: string;
  authenticationCode: string;
  phone: {
    countryCode: string;
    number: string;
  };
  _hasSucceded?: boolean;
}
