import { IconSpinner } from 'assets/icons/IconSpinner';
import { useEffect, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { parsePhoneNumber } from 'reinvest-app-common/src/utilities/phoneNumber';

import { useAuth } from '../../../../AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { user } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    useEffect(() => {
      user?.getUserAttributes(async (_err, attrs) =>
        setPhoneNumber(parsePhoneNumber(attrs?.find(attr => attr.Name === 'phone_number')?.Value ?? '').formatted),
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
      if (phoneNumber) {
        updateStoreFields({ _phoneNumber: phoneNumber });
        moveToNextStep();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneNumber]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
