import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CORPORATION_TYPES_AS_OPTIONS, CORPORATION_TYPES_VALUES } from 'reinvest-app-common/src/constants/account-types';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { WhyRequiredCorporationTypeModal } from 'views/whyRequiredModals/WhyRequiredCorporationTypeModal';
import { z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'corporationType'>;

const schema = z.object({
  corporationType: z.enum(CORPORATION_TYPES_VALUES),
});

export const StepCorporationType: StepParams<FlowFields> = {
  identifier: Identifiers.CORPORATION_TYPE,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateCompanyData;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const defaultValues: Fields = { corporationType: storeFields?.corporationType };
    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async ({ corporationType }) => {
      await updateStoreFields({ corporationType });
      moveToNextStep();
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <ModalTitle title="What type of Corporation do you have?" />

            <div className="flex w-full flex-col gap-24">
              <SelectionCards
                name="corporationType"
                control={control}
                options={CORPORATION_TYPES_AS_OPTIONS}
                className="flex flex-col items-stretch justify-center gap-16"
                orientation="vertical"
              />

              <div className="flex w-full justify-center">
                <OpenModalLink
                  label="Not sure which is best for you?"
                  green
                  onClick={onLinkClick}
                />
              </div>
            </div>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              disabled={shouldButtonBeDisabled}
              label="Continue"
            />
          </ButtonStack>
        </Form>

        <WhyRequiredCorporationTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
