import { useUserProfile } from 'providers/UserProfile';
import { useEffect } from 'react';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlow() {
  const { userProfile, userProfileMeta } = useUserProfile();
  const { CurrentStepView, updateStoreFields } = useFlow();

  const hasLoadedUserProfile = userProfileMeta?.isSuccess;

  useEffect(() => {
    async function initializeCurrentAddress() {
      const address = userProfile?.details?.address;

      if (hasLoadedUserProfile && address) {
        await updateStoreFields({ _currentAddress: address });
      }
    }

    initializeCurrentAddress();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoadedUserProfile]);

  return <CurrentStepView />;
}

export const FlowUpdateAddress = () => (
  <FlowProvider initialStoreFields={{}}>
    <InnerFlow />
  </FlowProvider>
);
