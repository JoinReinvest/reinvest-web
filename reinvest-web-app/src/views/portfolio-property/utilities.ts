import { Address } from 'reinvest-app-common/src/types/graphql';

export function formatAddressForMapTitle(address: Address): string {
  return [address.addressLine1, address.city, address.state, address.zip].filter(Boolean).join(', ');
}
