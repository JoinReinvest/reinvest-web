import { IconSpinner } from 'assets/icons/IconSpinner';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useEffect, useState } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'We are verifying your investment.';
const SUBTITLE = 'Verifying';

export const StepInvestmentVerification: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_VERIFICATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._selectedAccount, fields.investmentAmount !== undefined, fields.approvesSubscriptionAgreement];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsSuccess(true);
      }, 3000);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      async function verifySuccess() {
        if (isSuccess) {
          await updateStoreFields({ _investmentWasSuccessful: true });
          moveToNextStep();
        } else {
          await updateStoreFields({ _investmentWasSuccessful: false });
        }
      }

      verifySuccess();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
      <div className="relative h-full">
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col gap-32">
            <div className="flex w-full flex-col items-center gap-16">
              <IconSpinner />

              <Typography variant="paragraph-large">{SUBTITLE}</Typography>
            </div>

            <ModalTitle title={TITLE} />
          </div>
        </FormContent>
      </div>
    );
  },
};
