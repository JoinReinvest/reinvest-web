import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'profilePicture'>;

const schema = z.object({
  profilePicture: z.custom<File>().nullable(),
});

export const StepProfilePicture: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { profilePicture } = storeFields;
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: { profilePicture: profilePicture || null },
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    const onSkip = () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title=" Upload Profile Picture" />

        <InputAvatar
          name="profilePicture"
          control={control}
          altText="Profile picture for account"
        />

        <Typography variant="paragraph-large">Upload profile picture</Typography>

        <Typography
          variant="paragraph-large"
          className="text-white/50"
        >
          Customize your profile picture
        </Typography>

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
        />

        <Button
          label="Skip"
          variant="outlined"
          onClick={onSkip}
          className="text-green-frost-01"
        />
      </Form>
    );
  },
};
