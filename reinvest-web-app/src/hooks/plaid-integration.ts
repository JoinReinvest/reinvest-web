import { useEffect, useState } from 'react';
import { FulfillBankAccountInput } from 'reinvest-app-common/src/types/graphql';
import { mapPlaidDataForApi, PlaidEvent } from 'reinvest-app-common/src/utilities/plaid';
import { useCounter } from 'usehooks-ts';

interface Params {
  onPlaidResponse: (params: OnPlaidResponseParams) => Promise<void>;
}

interface Returns {
  iFrameKey: number;
  plaidResponse: FulfillBankAccountInput | null;
}

export interface OnPlaidResponseParams {
  hashedBankAccount: string | null;
  plaidResponse: FulfillBankAccountInput | null;
}

const EVENT_TYPE = 'message';

export function usePlaidIntegration({ onPlaidResponse }: Params): Returns {
  const { count: iFrameKey } = useCounter();
  const [plaidResponse, setPlaidResponse] = useState<FulfillBankAccountInput | null>(null);

  useEffect(() => {
    async function handler(event: PlaidEvent) {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

      if (data?.errorCode) {
        return onPlaidResponse({ plaidResponse: null, hashedBankAccount: null });
      }

      if (data.plaidAccountDetails?.length) {
        const dataForApi = mapPlaidDataForApi(data.plaidAccountDetails[0]);
        setPlaidResponse(dataForApi);

        const lastFourDigits = dataForApi.accountNumber.slice(-4);
        const hashedBankAccount = `**** **** **** ${lastFourDigits}`;

        return onPlaidResponse({ plaidResponse: dataForApi, hashedBankAccount });
      }
    }

    window.addEventListener(EVENT_TYPE, handler);

    return () => {
      window.removeEventListener(EVENT_TYPE, handler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { iFrameKey, plaidResponse };
}
