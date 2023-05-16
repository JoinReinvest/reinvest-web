import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { FormEventHandler, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetAccountConfiguration } from 'reinvest-app-common/src/services/queries/getAccountConfiguration';
import { useSetAutomaticDividendReinvestmentAgreement } from 'reinvest-app-common/src/services/queries/setAutomaticDividendReinvestmentAgreement';
import { getApiClient } from 'services/getApiClient';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Opt in for automatic dividend reinvesting?';
const MESSAGE_INFORMATION = 'What is automatic dividend reinvesting?';

export const StepAutomaticDividend: StepParams<FlowFields> = {
  identifier: Identifiers.AUTOMATIC_DIVIDENT_REINVESTMENT,

  doesMeetConditionFields: ({ optsInForAutomaticDividendReinvestment }) => {
    return !optsInForAutomaticDividendReinvestment;
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isLoading, toggleIsLoading] = useToggler(false);
    const { activeAccount } = useActiveAccount();
    const {
      data: accountConfiguration,
      refetch,
      isSuccess,
      isRefetching: isGetAccountConfigurationRefetching,
    } = useGetAccountConfiguration(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false } });
    const { mutate } = useSetAutomaticDividendReinvestmentAgreement(getApiClient);

    const onSkipButtonClick = async () => {
      toggleIsLoading(true);
      await updateStoreFields({ optsInForAutomaticDividendReinvestment: false });

      toggleIsLoading(false);
      moveToNextStep();
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      toggleIsLoading(true);

      if (activeAccount?.id) {
        await mutate({ accountId: activeAccount.id, automaticDividendReinvestmentAgreement: true });
        await updateStoreFields({ optsInForAutomaticDividendReinvestment: true });
      }

      toggleIsLoading(false);
      moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess && accountConfiguration?.automaticDividendReinvestmentAgreement.signed) {
        updateStoreFields({ optsInForAutomaticDividendReinvestment: true });
        moveToNextStep();
      }
    }, [isSuccess, accountConfiguration?.automaticDividendReinvestmentAgreement.signed, updateStoreFields, moveToNextStep]);

    useEffect(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Form onSubmit={onSubmit}>
        {isGetAccountConfigurationRefetching && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}
        {!isGetAccountConfigurationRefetching && (
          <FormContent>
            <div className="flex flex-col gap-36">
              <ModalTitle title={TITLE} />

              <div className="flex gap-8">
                <IconWarning className="stroke-black-01" />
                <Typography
                  variant="paragraph"
                  className="grow text-black-01"
                >
                  {MESSAGE_INFORMATION}
                </Typography>
              </div>
            </div>
          </FormContent>
        )}

        <ButtonStack>
          <Button
            label="Skip"
            variant="outlined"
            disabled={isLoading}
            onClick={onSkipButtonClick}
          />

          <Button
            type="submit"
            label="Opt-in"
            disabled={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
