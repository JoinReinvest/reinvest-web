import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { IconCircleError } from '../../../../../assets/icons/IconCircleError';
import { ButtonBack } from '../../../../../components/ButtonBack';
import { Input } from '../../../../../components/FormElements/Input';
import { Typography } from '../../../../../components/Typography';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = 'Update your name';
const SUBTITLE = 'Updating your name will prompt you to upload a new ID card';

type Fields = FlowFields;

const schema = z.object({
  name: z.object({
    firstName: formValidationRules.firstName,
    middleName: formValidationRules.middleName,
    lastName: formValidationRules.lastName,
  }),
});

export const StepNewName: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NEW_NAME,

  Component: ({ moveToNextStep, updateStoreFields, moveToPreviousStep, storeFields }: StepComponentProps<FlowFields>) => {
    const defaultValues = {
      name: storeFields.name,
    };

    const { control, handleSubmit, formState, reset } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
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
            <Typography variant="paragraph-small">
              <span className="flex items-center gap-9 text-gray-01">
                <IconCircleError className="inline-block" /> {SUBTITLE}
              </span>
            </Typography>
            <Input
              name="name.firstName"
              control={control}
              placeholder="First Name"
              required
            />

            <Input
              name="name.middleName"
              control={control}
              placeholder="Middle Name (Optional)"
            />

            <Input
              name="name.lastName"
              control={control}
              placeholder="Last Name"
              required
            />
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
