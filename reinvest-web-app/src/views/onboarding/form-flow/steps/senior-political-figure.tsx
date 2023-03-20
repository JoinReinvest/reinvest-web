import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { TextArea } from 'components/FormElements/TextArea';
import { Title } from 'components/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'seniorPoliticalFigure'>;

const schema = z.object({
  seniorPoliticalFigure: z.string().min(1),
});

export const StepSeniorPoliticalFigure: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SENIOR_POLITICAL_FIGURE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
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
        <Title title="Please provide the name and position of this senior political figure." />

        <TextArea
          name="seniorPoliticalFigure"
          control={control}
          maxCharacters={220}
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
