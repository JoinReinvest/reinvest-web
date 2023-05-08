import cx from 'classnames';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { PrivacyPolicyBlackModal } from 'views/PrivacyPolicyBlackModal';
import { TermsAndConditioncBlackModal } from 'views/TermsAndConditioncBlackModal';

interface Props {
  modalColor?: 'white' | 'black';
}

export const Footer = ({ modalColor = 'black' }: Props) => {
  const [isModalTermsOpen, toggleIsModalTermsOpen] = useToggler(false);
  const [isModalPrivacyOpen, toggleIsModalPrivacyIsOpen] = useToggler(false);

  const className = cx({ 'text-gray-04': modalColor === 'black', 'text-gray-02': modalColor === 'white' });

  return (
    <footer className="w-330 mx-auto text-center">
      <TermsAndConditioncBlackModal
        isOpen={isModalTermsOpen}
        onOpenChange={toggleIsModalTermsOpen}
      />

      <PrivacyPolicyBlackModal
        isOpen={isModalPrivacyOpen}
        onOpenChange={toggleIsModalPrivacyIsOpen}
      />

      <Typography
        variant="paragraph"
        className={className}
      >
        By continuing, you agree to the REINVEST
        <br />
        <OpenModalLink
          onClick={toggleIsModalTermsOpen}
          green
          label="Terms of Conditions"
        />{' '}
        and{' '}
        <OpenModalLink
          onClick={toggleIsModalPrivacyIsOpen}
          green
          label="Privacy Policy"
        />
        .
      </Typography>
    </footer>
  );
};
