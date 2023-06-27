import { IconSpinner } from 'assets/icons/IconSpinner';
import { ButtonBack } from 'components/ButtonBack';
import { Typography } from 'components/Typography';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountActivity, Maybe } from 'reinvest-app-common/src/types/graphql';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { AccountActivityItem } from '../components/AccountActivityItem';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';
import { useAccountActivities } from '../providers/AccountActivity';

const TITLE = 'Account Activity';

export const StepAccountActivity: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.INVESTMENT_HISTORY,

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { accountActivities, accountActivityMeta } = useAccountActivities();

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    async function onActivityClick(activity: Maybe<AccountActivity>) {
      await updateStoreFields({ _selectedAccountId: activity?.activityName });
      moveToNextStep();
    }

    function fetchMoreAccountActivities() {
      if (accountActivityMeta?.hasNextPage) {
        accountActivityMeta.fetchNextPage();
      }
    }

    if (accountActivityMeta.isLoading) {
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
          {accountActivities.map((activity, index) => (
            <AccountActivityItem
              key={activity?.activityName}
              activity={activity}
              isLastItem={index === accountActivities.length - 1}
              onClick={onActivityClick}
              fetchMoreItems={fetchMoreAccountActivities}
            />
          ))}
        </ul>
      </div>
    );
  },
};
