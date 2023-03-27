import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { Typography } from 'components/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
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
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.identificationDocument,
      fields.accountType,
    ];

    //TODO: More conditions for individual account type
    const individualAccountFields = [fields.employmentStatus, fields.employmentDetails, fields.netIncome, fields.netWorth];

    return (
      (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(profileFields) && !fields.isCompletedProfile) ||
      (allRequiredFieldsExists(individualAccountFields) && !!fields.isCompletedProfile)
    );
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
      await updateData(Identifiers.PROFILE_PICTURE, { ...storeFields, ...fields });
    };

    const onSkip = async () => {
      await updateData(Identifiers.PROFILE_PICTURE, { ...storeFields });
      moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess) {
        router.push('/');
      }
    });

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Upload Profile Picture" />

          {individualDraftAccountError && <FormMessage message={individualDraftAccountError.message} />}
          <div className="flex w-full flex-col items-center gap-12">
            <InputAvatar
              name="profilePicture"
              control={control}
              altText="Profile picture for account"
            />

            <Typography
              variant="paragraph-large"
              className="text-white/50"
            >
              Customize your profile picture
            </Typography>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />

          <Button
            label="Skip"
            variant="outlined"
            onClick={onSkip}
            className="text-green-frost-01"
          />
        </ButtonStack>
      </Form>
    );
  },
};
