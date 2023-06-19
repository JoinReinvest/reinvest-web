import { IconSpinner } from 'assets/icons/IconSpinner';
import { ButtonBack } from 'components/ButtonBack';
import { Typography } from 'components/Typography';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { InvestmentOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { InvestmentHistoryItem } from '../components/InvestmentHistoryItem';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';
import { useInvestmentHistory } from '../providers/InvestmentHistory';

const TITLE = 'Investment history';

export const StepInvestmentHistory: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.INVESTMENT_HISTORY,

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { investmentsList, investmentsListMeta } = useInvestmentHistory();

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    async function onInvestmentClick(investment: Maybe<InvestmentOverview>) {
      await updateStoreFields({ _selectedInvesmentId: investment?.id });
      moveToNextStep();
    }

    function fetchMoreInvestments() {
      if (investmentsListMeta?.hasNextPage) {
        investmentsListMeta.fetchNextPage();
      }
    }

    if (investmentsListMeta.isLoading) {
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
          {investmentsList.map((investment, index) => (
            <InvestmentHistoryItem
              key={investment?.id}
              investment={investment}
              isLastItem={index === investmentsList.length - 1}
              onClick={onInvestmentClick}
              fetchMoreItems={fetchMoreInvestments}
            />
          ))}
        </ul>
      </div>
    );
  },
};
