import { Auth } from '@aws-amplify/auth';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { Button } from 'components/Button';
import { CircleSuccess } from 'components/CircleSuccess';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Link } from 'components/Link';
import { ModalContent } from 'components/ModalElements/Content';
import { ModalTitle } from 'components/ModalElements/Title';
import { URL } from 'constants/urls';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useMemo, useState } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { RegisterFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

const LoginLink = () => {
  const label = 'Go to sign in';

  return (
    <Link
      href={URL.login}
      title={label}
    >
      {label}
    </Link>
  );
};

export const StepRegistrationValidation: StepParams<RegisterFormFields> = {
  identifier: Identifiers.FLOW_COMPLETION,
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password, fields.authenticationCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<RegisterFormFields>) => {
    const authContext = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [displayLoginLink, setDisplayLoginLink] = useState(false);

    const title = useMemo(() => {
      if (isLoading) {
        return 'Creating your account';
      }

      return 'Your login credentials were successfully created';
    }, [isLoading]);

    const onButtonClick = async () => {
      setIsLoading(true);

      try {
        await authContext.actions.signIn(storeFields.email, storeFields.password, URL.onboarding);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const confirmEmail = async () => {
        try {
          await Auth.confirmSignUp(storeFields.email, storeFields.authenticationCode);
        } catch (err) {
          const error = err as Error;

          if (error.message.includes('Current status is CONFIRMED')) {
            error.message = 'The user with this email is already registered.';
            setDisplayLoginLink(true);
          }

          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      confirmEmail();
    }, [storeFields.authenticationCode, storeFields.email]);

    return (
      <ModalContent>
        <div className="relative flex h-full flex-col gap-24 text-center md:justify-center">
          <div className="flex w-full flex-col items-center gap-32">
            {isLoading && !error && <IconSpinner />}
            {!isLoading && !error && <CircleSuccess />}
            {error && <IconXCircle />}

            <ModalTitle
              title={error || title}
              isTitleCenteredOnMobile
              subtitle={displayLoginLink && <LoginLink />}
              className="items-center"
            />
          </div>
        </div>

        <ButtonStack>
          <Button
            onClick={onButtonClick}
            label="Continue"
            disabled={isLoading || !!error}
          />
        </ButtonStack>
      </ModalContent>
    );
  },
};
