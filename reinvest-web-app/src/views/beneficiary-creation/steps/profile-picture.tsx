import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Required<Pick<BeneficiaryCreationFormFields, 'profilePicture'>>;

const schema = z.object({
  profilePicture: generateFileSchema(['jpeg', 'jpg', 'png'], 5.0),
});

const getBeneficiaryInitials = ({ firstName, lastName }: BeneficiaryCreationFormFields) => {
  const firstLetter = firstName ? firstName[0] : '';
  const secondLetter = lastName ? lastName[0] : '';

  return `${firstLetter}${secondLetter}`.toUpperCase();
};

export const StepProfilePicture: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.firstName, fields.lastName];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const beneficiaryInitials = getBeneficiaryInitials(storeFields);
    const defaultValues: Fields = { profilePicture: storeFields?.profilePicture || {} };

    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const onFileChange = async (file: File) => {
      await updateStoreFields({ profilePicture: { fileName: file.name, file } });
    };

    const onSubmit: SubmitHandler<Fields> = async ({ profilePicture }) => {
      await updateStoreFields({ profilePicture });
      moveToNextStep();
    };

    const onSkip = async () => {
      await updateStoreFields({ profilePicture: undefined });
      moveToNextStep();
    };

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const shouldSkipButtonBeDisabled = formState.isSubmitting;

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-24">
          <ButtonBack onClick={moveToPreviousStep} />

          <FormContent
            useFixedGap
            willLeaveContentOnTop
          >
            <Typography variant="paragraph-large">Upload a profile picture for your beneficiary (optional)</Typography>

            <InputAvatar
              name="profilePicture"
              control={control}
              onFileChange={onFileChange}
              altText={beneficiaryInitials}
            />
          </FormContent>
        </div>

        <ButtonStack>
          <Button
            variant="outlined"
            label="Skip"
            onClick={onSkip}
            disabled={shouldSkipButtonBeDisabled}
          />

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
