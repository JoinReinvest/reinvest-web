import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { StepComponentProps, StepParams } from 'services/form-flow';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepIdentificationDocumentsValidation: StepParams<OnboardingFormFields> = {
  isAValidationView: true,

  identifier: Identifiers.IDENTIFICATION_DOCUMENTS_VALIDATION,

  Component: ({ moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const isLoading = false;
    const hasSucceded = true;
    const succededAndLoaded = !isLoading && hasSucceded;
    const notSuccededAndLoaded = !isLoading && hasSucceded;

    const titleGenerator = () => {
      if (succededAndLoaded) {
        return 'Account Information Verified!';
      }

      if (notSuccededAndLoaded) {
        return 'We cannot approve your account at this time';
      }

      return 'Verifying Account Information';
    };

    const iconGenerator = () => {
      if (succededAndLoaded) {
        return <IconCheckCircle />;
      }

      if (notSuccededAndLoaded) {
        return <IconXCircle />;
      }

      return <IconSpinner />;
    };

    const onButtonClick = () => {
      moveToNextStep();
    };

    return (
      <div className="flex flex-col items-center gap-36">
        <Title title={titleGenerator()} />

        {iconGenerator()}

        <Button
          label="Continue"
          onClick={onButtonClick}
          disabled={isLoading}
          loading={isLoading}
        />
      </div>
    );
  },
};
