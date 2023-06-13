import { IconSpinner } from 'assets/icons/IconSpinner';
import { ButtonBack } from 'components/ButtonBack';
import { Typography } from 'components/Typography';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { InvestmentHistoryItem } from '../components/InvestmentHistoryItem';
import { FlowStepIdentifiers } from '../enums';
import { useInvestmentHistory } from '../hooks/investment-history';
import { FlowFields, InvestmentOverview } from '../interfaces';

const TITLE = 'Investment history';

export const StepInvestmentHistory: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.INVESTMENT_HISTORY,

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { investments, meta } = useInvestmentHistory();

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    async function onInvestmentClick({ id }: InvestmentOverview) {
      await updateStoreFields({ _selectedInvesmentId: id });
      moveToNextStep();
    }

    if (meta.isLoading) {
      return (
        <div className="grid h-full place-items-center">
          <IconSpinner />
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col gap-24">
        <ButtonBack onClick={onButtonBackClick} />

        <Typography variant="paragraph">{TITLE}</Typography>

        <ul className="flex h-full flex-col gap-16">
          {investments.map((investment, index) => (
            <InvestmentHistoryItem
              key={investment.id}
              investment={investment}
              isLastItem={index === investments.length - 1}
              onClick={onInvestmentClick}
            />
          ))}
        </ul>
      </div>
    );
  },
};
