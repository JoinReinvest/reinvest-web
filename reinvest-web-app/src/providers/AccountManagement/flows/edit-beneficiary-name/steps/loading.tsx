import { IconSpinner } from 'assets/icons/IconSpinner';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/getBeneficiaryAccount';

import { getApiClient } from '../../../../../services/getApiClient';
import { useActiveAccount } from '../../../../ActiveAccountProvider';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { data, isSuccess, isLoading } = useGetBeneficiaryAccount(getApiClient, {
      accountId: activeAccount?.id ?? '',
      config: { enabled: !!activeAccount?.id },
    });

    useEffect(() => {
      const updateFields = async () => {
        const firstName = data?.details?.name?.firstName;
        const lastName = data?.details?.name?.lastName;

        if (isSuccess && !isLoading && firstName && lastName) {
          await updateStoreFields({ name: { firstName, lastName } });

          return moveToNextStep();
        }

        return updateStoreFields({ name: { firstName: '', lastName: '' } });
      };

      updateFields();
    }, [isSuccess, data, isLoading, updateStoreFields, moveToNextStep]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
