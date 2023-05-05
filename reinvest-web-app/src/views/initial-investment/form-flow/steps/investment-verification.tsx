import { IconSpinner } from 'assets/icons/IconSpinner';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useEffect, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'We are verifying your investment.';
const SUBTITLE = 'Verifying';

export const StepInvestmentVerification: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_VERIFICATION,

  isAValidationView: true,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsSuccess(true);
      }, 3000);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
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
