import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { ComponentProps } from 'react';

interface Props extends PrimitiveProps {
  buttonLabel: string;
  title: string;
}

type PrimitiveProps = Required<Pick<ComponentProps<typeof Form>, 'onSubmit'>>;

export function ConfirmationView({ title, buttonLabel, onSubmit }: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <FormContent willLeaveContentOnTop>
        <div className="flex flex-col items-center gap-24">
          <IconCheckCircle />

          <Typography
            variant="h5"
            className="text-center"
          >
            {title}
          </Typography>
        </div>
      </FormContent>

      <ButtonStack>
        <Button
          type="submit"
          label={buttonLabel}
        />
      </ButtonStack>
    </Form>
  );
}
