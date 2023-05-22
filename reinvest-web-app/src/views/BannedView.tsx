import { DialogProps } from '@hookooekoo/ui-dialog';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { ModalTitle } from 'components/ModalElements/Title';

import { ButtonStack } from '../components/FormElements/ButtonStack';
import { Form } from '../components/FormElements/Form';
import { FormContent } from '../components/FormElements/FormContent';
// import { Link } from '../components/Link';
import { LinkButton } from '../components/LinkButton';
import { GetHelpLink } from '../components/Links/GetHelp';
import { ModalBlackFullscreen } from '../components/ModalBlackFullscreen';
import { Typography } from '../components/Typography';
import { EMAILS } from '../constants/urls';

type Props = Omit<DialogProps, 'children'> & { title: string };

const subtitle = (
  <Typography variant="paragraph-emphasized">
    Please reach out to{' '}
    <GetHelpLink
      label={EMAILS.support}
      className="text-green-frost-01 no-underline"
    />
  </Typography>
);

export const BannedView = ({ isOpen, onOpenChange, title }: Props) => {
  return (
    <ModalBlackFullscreen
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Form>
        <FormContent>
          <IconXCircle className="mx-auto" />
          <ModalTitle
            title={title}
            subtitle={subtitle}
          />
        </FormContent>
        <ButtonStack>
          <LinkButton
            label="Contact Us"
            href={EMAILS.supportHref}
          />
        </ButtonStack>
      </Form>
    </ModalBlackFullscreen>
  );
};
