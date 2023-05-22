import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputBirthDate } from 'components/FormElements/InputBirthDate';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { dateOlderThanEighteenYearsSchema } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { formatDate, isDateFromApi } from 'reinvest-app-common/src/utilities/dates';
import { WhyRequiredDateBirthModal } from 'views/whyRequiredModals/WhyRequiredDateBirthModal';
import { z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'dateOfBirth'>;

const schema = z.object({
  dateOfBirth: dateOlderThanEighteenYearsSchema,
});

export const StepDateOfBirth: StepParams<FlowFields> = {
  identifier: Identifiers.DATE_OF_BIRTH,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateProfileDetails;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const defaultValues: Fields = {
      dateOfBirth: isDateFromApi(storeFields.dateOfBirth || '')
        ? formatDate(storeFields.dateOfBirth || '', 'DEFAULT', { currentFormat: 'API' })
        : storeFields.dateOfBirth,
    };

    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onOpenInformationModalClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const dateOfBirth = formatDate(fields.dateOfBirth || '', 'API', { currentFormat: 'DEFAULT' });
      await updateStoreFields({ ...fields, dateOfBirth });
      moveToNextStep();
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <ModalTitle title="Enter your date of birth" />

            <div className="flex w-full flex-col gap-16">
              <InputBirthDate
                name="dateOfBirth"
                control={control}
              />

              <OpenModalLink
                label="Required. Why?"
                green
                onClick={onOpenInformationModalClick}
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

        <WhyRequiredDateBirthModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
