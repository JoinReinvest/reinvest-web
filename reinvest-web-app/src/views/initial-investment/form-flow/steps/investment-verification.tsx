import { IconSpinner } from 'assets/icons/IconSpinner';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { getApiClient } from 'services/getApiClient';

import { IconXCircle } from '../../../../assets/icons/IconXCircle';
import { Button } from '../../../../components/Button';
import { ButtonStack } from '../../../../components/FormElements/ButtonStack';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'We are verifying your investment.';
const SUBTITLE = 'Verifying';

export const StepInvestmentVerification: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_VERIFICATION,

  isAValidationView: true,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { mutate, isSuccess, data, isLoading } = useVerifyAccount(getApiClient);

    useEffect(() => {
      if (activeAccount?.id) {
        mutate({ accountId: activeAccount.id });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isSuccess) {
        console.log('data', data);

        if (data?.isAccountVerified) {
          moveToNextStep();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    const onSubmit = () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        {isLoading && !data && (
          <FormContent>
            <div className="flex flex-col gap-32">
              <div className="flex w-full flex-col items-center gap-16">
                <IconSpinner />

                <Typography variant="paragraph-large">{SUBTITLE}</Typography>
              </div>

              <ModalTitle title={TITLE} />
            </div>
          </FormContent>
        )}
        {data && !data.isAccountVerified && (
          <>
            <FormContent>
              <div className="flex flex-col gap-32">
                <div className="flex w-full flex-col items-center gap-16">
                  <IconXCircle />
                </div>

                <ModalTitle
                  title="We could not verify your information"
                  subtitle="Please update your information and we will run our verification process again."
                />
              </div>
            </FormContent>
            <ButtonStack>
              <Button
                label="Edit Information"
                variant="default"
                type="submit"
              />
            </ButtonStack>
          </>
        )}
      </Form>
    );
  },
};
