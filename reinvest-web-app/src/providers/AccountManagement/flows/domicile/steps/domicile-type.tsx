import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { RadioGroupOptions } from 'components/FormElements/RadioGroupOptions';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { useUserProfile } from 'providers/UserProfile';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS, RESIDENCY_STATUS_VALUES } from 'reinvest-app-common/src/constants/residenty-status';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { Schema, z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

type Fields = Pick<FlowFields, 'type'>;

const schema: Schema<Fields> = z.object({
  type: z.enum(RESIDENCY_STATUS_VALUES),
});

const TITLE = 'Residency Status';
const BUTTON_LABEL_CITIZEN = 'Update';
const BUTTON_LABEL_FALLBACK = 'Continue';

export const StepDomicileType: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.DOMICILE_TYPE,

  Component: ({ storeFields, moveToNextStep, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { updateUserProfile, updateUserProfileMeta } = useUserProfile();
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const form = useForm<Fields>({ resolver: zodResolver(schema), defaultValues: async () => ({ type: storeFields.type }) });
    const domicileType = form.watch('type');
    const isCitizen = useMemo(() => domicileType === DomicileType.Citizen, [domicileType]);
    const buttonLabel = useMemo(() => (isCitizen ? BUTTON_LABEL_CITIZEN : BUTTON_LABEL_FALLBACK), [isCitizen]);

    useEffect(() => {
      async function updateDomicile() {
        if (isCitizen && updateUserProfileMeta.isSuccess) {
          moveToStepByIdentifier(FlowStepIdentifiers.CONFIRMATION);
        }
      }

      updateDomicile();
    }, [isCitizen, updateUserProfileMeta.isSuccess, moveToStepByIdentifier]);

    const shouldButtonBeLoading = updateUserProfileMeta.isLoading || form.formState.isSubmitting;
    const shouldButtonBeDisabled = !form.formState.isValid || shouldButtonBeLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ type }) => {
      if (type === DomicileType.Citizen) {
        await updateUserProfile({ domicile: { type } });

        return;
      } else {
        await updateStoreFields({ type });
        moveToNextStep();

        return;
      }
    };

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldButtonBeLoading}
          />

          <Typography variant="h5">{TITLE}</Typography>

          <RadioGroupOptions
            name="type"
            control={form.control}
            options={RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS}
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={buttonLabel}
            loading={shouldButtonBeLoading}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
