import { IconSpinner } from 'assets/icons/IconSpinner';
import { useUserProfile } from 'providers/UserProfile';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { userProfile, updateUserProfileMeta } = useUserProfile();

    useEffect(() => {
      async function updateAccountDetails() {
        if (userProfile) {
          const domicile = userProfile.details?.domicile;

          await updateStoreFields({
            type: domicile?.type ?? undefined,
            birthCountry: domicile?.birthCountry ?? undefined,
            citizenshipCountry: domicile?.citizenshipCountry ?? undefined,
            visaType: domicile?.visaType ?? undefined,
          });

          moveToNextStep();
        }
      }

      updateAccountDetails();

      return () => {
        updateUserProfileMeta.reset();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
