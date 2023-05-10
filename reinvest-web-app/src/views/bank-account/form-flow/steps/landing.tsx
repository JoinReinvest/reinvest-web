import { Separator } from '@radix-ui/react-separator';
import { IconChain } from 'assets/icons/IconChain';
import { IconEyeHide } from 'assets/icons/IconEyeHide';
import { LogoIcon2 } from 'assets/LogoIcon2';
import { LogoPlaid } from 'assets/LogoPlaid';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { FormEventHandler, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { useActiveAccount } from '../../../../providers/ActiveAccountProvider';
import { getApiClient } from '../../../../services/getApiClient';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'REINVEST uses Plaid to connect your account';
const BUTTON_LABEL = 'Continue';
const LIST_ITEMS = [
  {
    icon: <IconChain />,
    title: 'Connect effortlessly',
    description: 'Plaid lets you securely connect your financial accounts in seconds.',
  },
  {
    icon: <IconEyeHide className="h-24 w-24 stroke-black-01" />,
    title: 'Your data belongs to you',
    description: "Plaid doesn't sell personal info, ad will only use it with your permission.",
  },
];

export const StepLanding: StepParams<FlowFields> = {
  identifier: Identifiers.LANDING,

  // isAValidationView: true,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const {
      refetch,
      // isError,
      data: readBankAccountData,
      isSuccess: isReadBankAccountSuccess,
      isLoading: isReadBankAccountLoading,
    } = useReadBankAccount(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false, retry: 1 } });

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();

      moveToNextStep();
    };

    useEffect(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isReadBankAccountSuccess && readBankAccountData?.accountNumber) {
        updateStoreFields({ bankAccount: readBankAccountData.accountNumber });
        moveToNextStep();
      }
    }, [isReadBankAccountSuccess, moveToNextStep, updateStoreFields, readBankAccountData?.accountNumber]);

    return (
      <Form onSubmit={onSubmit}>
        {isReadBankAccountLoading && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}
        {!isReadBankAccountLoading && (
          <>
            <FormContent>
              <div className="flex flex-col gap-48">
                <header className="flex justify-center gap-14">
                  <LogoIcon2 className="h-25 w-auto" />

                  <Separator
                    orientation="vertical"
                    className="w-1 bg-black-01"
                  />

                  <LogoPlaid />
                </header>

                <div className="flex flex-col gap-40">
                  <ModalTitle title={TITLE} />

                  <ul className="flex flex-col gap-24">
                    {LIST_ITEMS.map(({ icon, title, description }) => (
                      <li
                        className="flex gap-8"
                        key={lowerCaseWithoutSpacesGenerator(title)}
                      >
                        {icon}

                        <div className="flex flex-col gap-8">
                          <Typography variant="paragraph-emphasized">{title}</Typography>
                          <Typography variant="paragraph-large">{description}</Typography>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FormContent>

            <ButtonStack>
              <Button
                type="submit"
                label={BUTTON_LABEL}
              />
            </ButtonStack>
          </>
        )}
      </Form>
    );
  },
};
