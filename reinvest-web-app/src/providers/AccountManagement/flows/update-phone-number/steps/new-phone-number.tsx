import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CALLING_CODES } from 'reinvest-app-common/src/constants/country-codes';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import zod, { Schema, z } from 'zod';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { InputPhoneNumber } from '../../../../../components/FormElements/InputPhoneNumber';
import { InputPhoneNumberCountryCode } from '../../../../../components/FormElements/InputPhoneNumberCountryCode';
import { Typography } from '../../../../../components/Typography';
import { getApiClient } from '../../../../../services/getApiClient';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = 'Add a new phone number';

type Fields = Omit<FlowFields, '_phoneNumber' | 'authenticationCode'>;
export const StepNewPhoneNumber: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NEW_PHONE_NUMBER,

  isAValidationView: true,

  Component: ({ moveToNextStep, moveToPreviousStep, storeFields, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const schema: Schema<Fields> = zod.object({
      phone: z.object({
        countryCode: z.enum(CALLING_CODES),
        number: formValidationRules.phoneNumber,
      }),
    });

    const { control, handleSubmit, formState, reset } = useForm<Fields>({ mode: 'onSubmit', resolver: zodResolver(schema) });

    const { mutateAsync, isLoading } = useSetPhoneNumber(getApiClient);
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;
    const onSubmit: SubmitHandler<Fields> = async ({ phone }) => {
      await mutateAsync({ phoneNumber: phone.number, countryCode: phone.countryCode });
      await updateStoreFields({ phone: { number: phone.number, countryCode: phone.countryCode } });
      moveToNextStep();
    };

    const onButtonBackClick = () => {
      reset();
      moveToPreviousStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>
            <div className="flex">
              <div className="select-phone-number-country-code contents child:basis-2/5">
                <InputPhoneNumberCountryCode
                  name="phone.countryCode"
                  control={control}
                  defaultValue={CALLING_CODES[0]}
                />
              </div>

              <div className="contents">
                <InputPhoneNumber
                  name="phone.number"
                  control={control}
                  willDisplayErrorMessage={false}
                  defaultValue={storeFields.phone?.number}
                />
              </div>
            </div>
          </div>
        </FormContent>
        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
