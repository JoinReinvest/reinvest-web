import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { Typography } from 'components/Typography';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { BeneficiaryCreationFormFields } from '../form-fields';
import { useCreateBeneficiary } from '../hooks/create-beneficiary';
import { Identifiers } from '../identifiers';
import { getBeneficiaryInitials } from '../utilities/beneficiary';

type Fields = Required<Pick<BeneficiaryCreationFormFields, 'profilePicture'>>;

const schema = z.object({
  profilePicture: generateFileSchema(['jpeg', 'jpg', 'png'], 5.0, true),
});

const TITLE = 'Upload a profile picture for your beneficiary (optional)';
const BUTTON_LABEL = 'Continue';

export const StepProfilePicture: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.firstName, fields.lastName];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const { createBeneficiary, error, isLoading, hasSucceded, beneficiary } = useCreateBeneficiary();
    const { beneficiaryInitials, defaultValues } = useMemo(() => {
      const beneficiaryInitials = getBeneficiaryInitials(storeFields);
      const defaultValues: Fields = { profilePicture: storeFields?.profilePicture || {} };

      return { beneficiaryInitials, defaultValues };
    }, [storeFields]);

    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues,
    });

    useEffect(() => {
      async function updateStoreFieldsAndMoveToNextStep() {
        if (hasSucceded) {
          await updateStoreFields({ beneficiary });
          moveToNextStep();
        }
      }

      updateStoreFieldsAndMoveToNextStep();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasSucceded]);

    const onFileChange = async (file: File) => {
      await updateStoreFields({ profilePicture: { fileName: file.name, file } });
    };

    const onSubmit: SubmitHandler<Fields> = async ({ profilePicture }) => {
      await updateStoreFields({ profilePicture });
      await createBeneficiary({ ...storeFields, profilePicture });
    };

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-24">
          <ButtonBack onClick={moveToPreviousStep} />

          <FormContent
            useFixedGap
            willLeaveContentOnTop
          >
            <Typography variant="paragraph-large">{TITLE}</Typography>

            <InputAvatar
              name="profilePicture"
              control={control}
              onFileChange={onFileChange}
              altText={beneficiaryInitials}
              accountType={AccountType.Beneficiary}
            />

            {error && <ErrorMessagesHandler error={error} />}
          </FormContent>
        </div>

        <ButtonStack useRowOnLgScreen>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            loading={isLoading}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
