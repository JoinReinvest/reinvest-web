import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { DraftAccountType } from 'types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'profilePicture'>;

const schema = z.object({
  profilePicture: z.custom<File>().nullable(),
});

export const StepProfilePicture: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
      fields.socialSecurityNumber,
      fields.identificationDocument,
      fields.accountType,
    ];

    //TODO: More conditions for individual account type
    return fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const router = useRouter();
    const { profilePicture } = storeFields;
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: { profilePicture: profilePicture || null },
    });

    const {
      isLoading,
      updateData,
      error: { individualDraftAccountError },
      isSuccess,
    } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      updateData(Identifiers.PROFILE_PICTURE, { ...storeFields, ...fields });
      // moveToNextStep();
    };

    const onSkip = () => {
      updateData(Identifiers.PROFILE_PICTURE, { ...storeFields });
      moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess) {
        router.push('/');
      }
    });

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title=" Upload Profile Picture" />

        {individualDraftAccountError && <FormMessage message={individualDraftAccountError.message} />}

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
