import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectFilterable } from 'components/FormElements/SelectFilterable';
import { ModalTitle } from 'components/ModalElements/Title';
import { Select } from 'components/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { VISAS_AS_OPTIONS } from 'reinvest-app-common/src/constants/visas';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'domicile'>;

const schema = z.object({
  domicile: z.object({
    forVisa: z.object({
      birthCountry: formValidationRules.birthCountry,
      citizenshipCountry: formValidationRules.citizenshipCountry,
      visaType: formValidationRules.visaType,
    }),
  }),
});

export const StepResidencyVisa: StepParams<FlowFields> = {
  identifier: Identifiers.RESIDENCY_VISA,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateProfileDetails && fields.residency === DomicileType.Visa;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
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
            title="Please enter your US Visa details."
            informationMessage="US Residents Only"
          />

          <div className="flex w-full flex-col gap-16">
            <SelectFilterable
              name="domicile.forVisa.citizenshipCountry"
              control={control}
              options={COUNTRIES}
              placeholder="Citizenship Country"
            />

            <SelectFilterable
              name="domicile.forVisa.birthCountry"
              control={control}
              options={COUNTRIES}
              placeholder="Birth Country"
            />

            <Select
              name="domicile.forVisa.visaType"
              control={control}
              options={VISAS_AS_OPTIONS}
              placeholder="Visa Type"
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
