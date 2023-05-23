import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect, useState } from 'react';
import { FlowFields } from 'views/initial-investment/form-flow/fields';

interface Returns {
  initialStoreFields: typeof INITIAL_STORE_FIELDS;
}

const INITIAL_STORE_FIELDS: FlowFields = {
  _hasCompletedFlow: false,
  bankAccount: '',
};

export function useInvestmentStoreFields(): Returns {
  const [initialStoreFields, setInitialStoreFields] = useState<typeof INITIAL_STORE_FIELDS>(INITIAL_STORE_FIELDS);
  const { arrivesFromOnboarding, setArrivesFromOnboarding } = useActiveAccount();

  useEffect(() => {
    setArrivesFromOnboarding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (arrivesFromOnboarding) {
      setInitialStoreFields({ ...INITIAL_STORE_FIELDS, _arrivesFromOnboarding: true });
    } else {
      setInitialStoreFields(INITIAL_STORE_FIELDS);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivesFromOnboarding]);

  return { initialStoreFields };
}
