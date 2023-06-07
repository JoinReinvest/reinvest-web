import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

const TITLE = "Congrats, your profile's live! To fully get set up, time to make that first investment. \nLet's go! 💰💸";

export const StepAccountCompletion: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_COMPLETION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.address,
      fields.experience,
      fields.accountType,
      fields._accountSuccesfullyCreated,
    ];

    return allRequiredFieldsExists(profileFields);
  },

  Component: ({ storeFields }: StepComponentProps<OnboardingFormFields>) => {
    const router = useRouter();
    const { userProfileMeta } = useActiveAccount();
    const { setLatestAccountOnboardedId, allAccountsMeta, setArrivesFromOnboarding } = useActiveAccount();
    const { accountId } = storeFields;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();

      if (accountId) {
        allAccountsMeta.refetch();
        userProfileMeta.refetch();
        setLatestAccountOnboardedId(accountId);
        setArrivesFromOnboarding(true);
        await router.push(URL.index);
      }
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent
          useFixedGap
          className="gap-32"
        >
          <div className="flex w-full justify-center">
            <IconCheckCircle />
          </div>

          <ModalTitle title={TITLE} />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Invest"
          />
        </ButtonStack>
      </Form>
    );
  },
};
