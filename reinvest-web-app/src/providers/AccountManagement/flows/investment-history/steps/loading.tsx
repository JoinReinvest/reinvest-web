import { IconSpinner } from 'assets/icons/IconSpinner';
import { useActiveInvestmentSummary } from 'hooks/active-investment-summary';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, moveToStepByIdentifier, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeInvestmentSummaryId, setActiveInvestmentSummaryId } = useActiveInvestmentSummary();

    useEffect(() => {
      async function checkforCachedInvestment() {
        await updateStoreFields({ _selectedInvesmentId: activeInvestmentSummaryId ?? undefined, _userArrivedFromManageAccount: !activeInvestmentSummaryId });

        if (activeInvestmentSummaryId) {
          moveToStepByIdentifier(FlowStepIdentifiers.INVESTMENT_SUMMARY);
        } else {
          moveToNextStep();
        }
      }

      checkforCachedInvestment();

      return () => {
        setActiveInvestmentSummaryId(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="grid h-full place-items-center">
        <IconSpinner />
      </div>
    );
  },
};
