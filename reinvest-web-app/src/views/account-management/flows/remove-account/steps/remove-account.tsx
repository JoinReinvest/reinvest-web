import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { useRemoveBeneficiary } from '../hooks/remove-beneficiary';
import { FlowFields } from '../interfaces';

const PLACEHOLDER = '{}';

const TITLE = 'Remove Account';
const SUBTITLE = 'Account Value';
const DISCLAIMERS = [
  `Are you sure you'd like to remove ${PLACEHOLDER} as an account beneficiary?`,
  `Removing ${PLACEHOLDER} will re-allocate all their investments into your main account.`,
];
const BUTTON_LABEL = 'Remove account';

export const StepRemoveAccount: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.REMOVE_ACCOUNT,

  Component: () => {
    const { handleSubmit, formState } = useForm<FlowFields>({ mode: 'onSubmit' });
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { activeAccountStats, activeAccount } = useActiveAccount();
    const { removeBeneficiary, removeBeneficiaryMeta } = useRemoveBeneficiary();

    const shouldButtonBeLoading = removeBeneficiaryMeta.isLoading;
    const shouldButtonBeDisabled = shouldButtonBeLoading || !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<FlowFields> = async () => {
      removeBeneficiary();
    };

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldButtonBeLoading}
          />

          <div className="flex flex-col gap-24">
            <Typography variant="h5">{TITLE}</Typography>

            <div>
              <Typography variant="paragraph-emphasized">{SUBTITLE}</Typography>

              <p className="text-48 leading-90">{activeAccountStats?.accountValue}</p>
            </div>

            <>
              {DISCLAIMERS.map((disclaimer, index) => (
                <Typography
                  key={index}
                  variant="paragraph-large"
                >
                  {disclaimer.replace(PLACEHOLDER, activeAccount?.label ?? '')}
                </Typography>
              ))}
            </>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading}
            variant="error"
          />
        </ButtonStack>
      </Form>
    );
  },
};
