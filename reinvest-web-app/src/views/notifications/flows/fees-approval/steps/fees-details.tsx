import { IconCircleWarning } from 'assets/icons/IconCircleWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { useApproveFees } from 'hooks/approve-fees';
import { FormEvent, useEffect, useMemo } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

import { InvestmentDetails } from '../components/InvestmentDetails';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Notice: $10 fee for manual verification';
const SUBTITLE = 'As your verification has failed twice, REINVEST needs to run a manual verification.';
const BUTTON_LABEL_APPROVE = 'Accept';
const BUTTON_LABEL_CANCEL = 'Cancel';

export const StepFeesDetails: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.FEES_DETAILS,

  willBePartOfTheFlow: fields => !!fields.investment,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const investmentId = useMemo(() => storeFields.investment?.id ?? '', [storeFields?.investment]);
    const { updateCurrentFlow } = useFlowsManagerContext();
    const { approveFees, approveFeesMeta } = useApproveFees({ investmentId });

    useEffect(() => {
      async function validateFeesApproval() {
        if (approveFeesMeta.isSuccess) {
          await updateStoreFields({ _hasSuccessfullyApprovedFees: true });
          moveToNextStep();
        }
      }

      validateFeesApproval();
    }, [approveFeesMeta.isSuccess, updateStoreFields, moveToNextStep]);

    async function onApproveFees(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      await approveFees();
    }

    async function onCancelFees() {
      updateCurrentFlow({ identifier: null });
    }

    return (
      <Form onSubmit={onApproveFees}>
        <FormContent
          useFixedGap
          className="gap-32"
        >
          <div className="flex w-full flex-col items-center gap-16">
            <IconCircleWarning />
          </div>

          <ModalTitle
            title={TITLE}
            subtitle={SUBTITLE}
          />

          <InvestmentDetails investment={storeFields?.investment ?? null} />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL_APPROVE}
            disabled={approveFeesMeta?.isLoading}
            loading={approveFeesMeta?.isLoading}
          />

          <Button
            label={BUTTON_LABEL_CANCEL}
            variant="outlined"
            className="text-green-frost-01"
            onClick={onCancelFees}
            disabled={approveFeesMeta?.isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
