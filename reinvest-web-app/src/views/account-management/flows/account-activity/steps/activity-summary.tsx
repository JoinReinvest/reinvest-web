import { IconSpinner } from 'assets/icons/IconSpinner';
import { ButtonBack } from 'components/ButtonBack';
import { Typography } from 'components/Typography';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Separator } from '../../../../../components/Separator';
import { AccountActivityDetail } from '../components/AccountActivityDetail';
import { ACCOUNT_ACTIVITY_SUMMARY } from '../constants';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';
import { getActivityDetails } from '../utilities';

export const StepActivitySummary: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.ACCOUNT_ACTIVITIES_SUMMARY,

  doesMeetConditionFields: fields => {
    return !!fields._selectedAccountId;
  },

  Component: ({ updateStoreFields, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const accountActivity = ACCOUNT_ACTIVITY_SUMMARY;

    async function onButtonBackClick() {
      await updateStoreFields({ _selectedAccountId: undefined });
      moveToPreviousStep();
    }

    if (!accountActivity) {
      return (
        <div className="grid h-full place-items-center">
          <IconSpinner />
        </div>
      );
    }

    const details = getActivityDetails(accountActivity);

    return (
      <div className="grid h-full grid-cols-1 grid-rows-full-auto justify-between gap-16">
        <div className="flex h-full flex-col gap-24">
          <ButtonBack onClick={onButtonBackClick} />

          <section className="flex h-full flex-col gap-16">
            <header className="flex flex-col gap-12">
              <Typography variant="h5">{accountActivity.activityName}</Typography>
            </header>

            <dl className="flex flex-col gap-16">
              {details.map(({ label, value }, index) => {
                const isLastIndex = index === details.length - 1;

                return (
                  <>
                    <AccountActivityDetail
                      key={label}
                      title={label}
                      value={value}
                    />

                    {!isLastIndex && <Separator />}
                  </>
                );
              })}
            </dl>
          </section>
        </div>
      </div>
    );
  },
};
