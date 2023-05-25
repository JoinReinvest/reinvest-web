import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { FormEventHandler, useEffect, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateBankAccount } from 'reinvest-app-common/src/services/queries/createBankAccount';
import { useFulfillBankAccount } from 'reinvest-app-common/src/services/queries/fulfillBankAccount';
import { FulfillBankAccountInput } from 'reinvest-app-common/src/types/graphql';
import { mapPlaidDataForApi, PlaidEvent } from 'reinvest-app-common/src/utilities/plaid';
import { getApiClient } from 'services/getApiClient';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Select your bank';

export const StepBankSelection: StepParams<FlowFields> = {
  identifier: Identifiers.BANK_SELECTION,

  doesMeetConditionFields: fields => {
    return !fields.bankAccount;
  },

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const [plaidDataForApi, setPlaidDataForApi] = useState<FulfillBankAccountInput>();

    const {
      mutateAsync: createBankAccountMutation,
      isLoading: isCreateBankAccountLoading,
      data: createBankAccountData,
      isSuccess: isCreateBankAccountSuccess,
      error: createBankAccountError,
    } = useCreateBankAccount(getApiClient);
    const {
      mutateAsync: fulfillBankAccountMutation,
      isSuccess: isFulfillBankAccountSuccess,
      isLoading: isFulfillBankAccountLoading,
    } = useFulfillBankAccount(getApiClient);
    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();

      moveToNextStep();
    };

    useEffect(() => {
      if (activeAccount?.id) {
        createBankAccountMutation({ accountId: activeAccount.id });
      }
    }, [createBankAccountMutation, activeAccount?.id]);

    useEffect(() => {
      const handler = (event: PlaidEvent) => {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (data.plaidAccountDetails?.length) {
          const dataForApi = mapPlaidDataForApi(data.plaidAccountDetails[0]);
          setPlaidDataForApi(dataForApi);
        }
      };

      window.addEventListener('message', handler);

      return () => window.removeEventListener('message', handler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (plaidDataForApi && activeAccount?.id) {
        fulfillBankAccountMutation({ accountId: activeAccount.id, input: plaidDataForApi });
        updateStoreFields({ bankAccount: hashBankAccountNumber(plaidDataForApi.accountNumber) });
      }
    }, [plaidDataForApi, activeAccount?.id, fulfillBankAccountMutation, updateStoreFields]);

    useEffect(() => {
      if (isFulfillBankAccountSuccess) {
        moveToNextStep();
      }
    }, [isFulfillBankAccountSuccess, moveToNextStep, updateStoreFields, plaidDataForApi?.accountNumber]);

    return (
      <Form onSubmit={onSubmit}>
        {createBankAccountError && <ErrorMessagesHandler error={createBankAccountError} />}

        {(isCreateBankAccountLoading || isFulfillBankAccountLoading) && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}
        {!isCreateBankAccountLoading && !isFulfillBankAccountLoading && isCreateBankAccountSuccess && createBankAccountData?.link && (
          <>
            <FormContent>
              <Typography variant="h3">{TITLE}</Typography>
              <iframe
                className="h-full w-full"
                src={createBankAccountData.link}
                title="plaid connection"
              />
            </FormContent>
          </>
        )}
      </Form>
    );
  },
};

const hashBankAccountNumber = (bankAccountFullNumber: string) => `****${bankAccountFullNumber.slice(-4)}`;
