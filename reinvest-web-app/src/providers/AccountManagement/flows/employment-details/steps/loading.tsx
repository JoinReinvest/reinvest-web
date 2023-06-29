import { IconSpinner } from 'assets/icons/IconSpinner';
import { useIndividualAccount } from 'hooks/individual-account';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { individualAccount, updateIndividualAccountMeta } = useIndividualAccount();

    useEffect(() => {
      async function updateAccountDetails() {
        if (individualAccount) {
          const details = individualAccount.details;

          await updateStoreFields({
            employmentStatus: details?.employmentStatus?.status ?? undefined,
            employmentDetails: {
              employerName: details?.employer?.nameOfEmployer ?? undefined,
              occupation: details?.employer?.title ?? undefined,
              industry: details?.employer?.industry ?? undefined,
            },
          });

          moveToNextStep();
        }
      }

      updateAccountDetails();

      return () => {
        updateIndividualAccountMeta.reset();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [individualAccount]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
