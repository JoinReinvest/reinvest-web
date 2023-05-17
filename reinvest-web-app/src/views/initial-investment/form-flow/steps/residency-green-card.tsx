import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectFilterable } from 'components/FormElements/SelectFilterable';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'domicile'>;

const schema = z.object({
  domicile: z.object({
    forGreenCard: z.object({
      birthCountry: formValidationRules.birthCountry,
      citizenshipCountry: formValidationRules.citizenshipCountry,
    }),
  }),
});

export const StepResidencyGreenCard: StepParams<FlowFields> = {
  identifier: Identifiers.RESIDENCY_GREEN_CARD,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateProfileDetails && fields.residency === DomicileType.GreenCard;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { domicile: { forGreenCard: storeFields.domicile?.forGreenCard } };
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title="Please enter your US Green Card details."
            informationMessage="US Residents Only"
          />

          <div className="flex w-full flex-col gap-16">
            <SelectFilterable
              name="domicile.forGreenCard.citizenshipCountry"
              control={control}
              options={COUNTRIES}
              placeholder="Citizenship Country"
            />

            <SelectFilterable
              name="domicile.forGreenCard.birthCountry"
              control={control}
              options={COUNTRIES}
              placeholder="Birth Country"
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
