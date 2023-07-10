import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { useRegisterFormFlow } from '../form-flow';

export function useInitializeFields() {
  const router = useRouter();
  const referralQuery = router.query.referral;
  const referralCode = useMemo(() => (typeof referralQuery === 'string' ? referralQuery : undefined), [referralQuery]);
  const { updateStoreFields } = useRegisterFormFlow();

  useEffect(() => {
    async function initializeFields() {
      if (referralCode) {
        await updateStoreFields({ referralCode });
      }
    }

    initializeFields();
  }, [referralCode, updateStoreFields]);
}
