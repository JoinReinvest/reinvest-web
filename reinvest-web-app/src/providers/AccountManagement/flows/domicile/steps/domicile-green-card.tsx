import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectFilterable } from 'components/FormElements/SelectFilterable';
import { Typography } from 'components/Typography';
import { useUserProfile } from 'providers/UserProfile';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { Schema, z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'US Green Card details.';
const BUTTON_LABEL = 'Update';

type Fields = Pick<FlowFields, 'birthCountry' | 'citizenshipCountry'>;

const schema: Schema<Fields> = z.object({
  birthCountry: formValidationRules.birthCountry,
  citizenshipCountry: formValidationRules.citizenshipCountry,
});

export const StepDomicileGreenCard: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.DOMICILE_GREEN_CARD,

  doesMeetConditionFields: fields => {
    return fields.type === DomicileType.GreenCard;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { updateUserProfile, updateUserProfileMeta } = useUserProfile();
    const form = useForm<FlowFields>({ resolver: zodResolver(schema), defaultValues: async () => storeFields });

    useEffect(() => {
      if (updateUserProfileMeta?.isSuccess) {
        moveToNextStep();
      }
    }, [updateUserProfileMeta?.isSuccess, moveToNextStep]);

    const shouldButtonBeLoading = updateUserProfileMeta?.isLoading || form.formState?.isSubmitting;
    const shouldButtonBeDisabled = !form.formState.isValid || shouldButtonBeLoading;

    const onSubmit: SubmitHandler<FlowFields> = async ({ birthCountry, citizenshipCountry }) => {
      await updateStoreFields({ birthCountry, citizenshipCountry });

      if (storeFields.type && birthCountry && citizenshipCountry) {
        await updateUserProfile({
          domicile: {
            type: storeFields.type,
            forGreenCard: {
              birthCountry,
              citizenshipCountry,
            },
          },
        });
      }
    };

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldButtonBeLoading}
          />

          <Typography variant="h5">{TITLE}</Typography>

          <div className="flex w-full flex-col gap-16">
            {updateUserProfileMeta.error && <ErrorMessagesHandler error={updateUserProfileMeta.error} />}

            <SelectFilterable
              name="citizenshipCountry"
              control={form.control}
              options={COUNTRIES}
              required
              placeholder="Citizenship Country"
              forWhiteBackground
            />

            <SelectFilterable
              name="birthCountry"
              control={form.control}
              options={COUNTRIES}
              required
              placeholder="Birth Country"
              forWhiteBackground
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
