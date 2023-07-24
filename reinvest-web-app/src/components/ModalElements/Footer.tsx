import cx from 'classnames';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { PrivacyPolicyBlackModal } from 'views/PrivacyPolicyBlackModal';
import { TermsAndConditioncBlackModal } from 'views/TermsAndConditioncBlackModal';

interface Props {
  modalColor?: 'white' | 'black';
  width?: 'md' | 'lg';
}

export const ModalFooter = ({ modalColor = 'black', width = 'md' }: Props) => {
  const [isModalTermsOpen, toggleIsModalTermsOpen] = useToggler(false);
  const [isModalPrivacyOpen, toggleIsModalPrivacyIsOpen] = useToggler(false);

  const className = cx('mx-auto text-center', { 'w-330': width === 'md', 'w-415': width === 'lg' });
  const textClassName = cx({ 'text-gray-04': modalColor === 'black', 'text-gray-02': modalColor === 'white' });

  return (
    <footer className={className}>
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
        className={textClassName}
      >
        By continuing, you agree to the REINVEST
        <br />
        <OpenModalLink
          onClick={toggleIsModalTermsOpen}
          green={modalColor === 'black'}
          label="Terms of Conditions"
        />{' '}
        and{' '}
        <OpenModalLink
          onClick={toggleIsModalPrivacyIsOpen}
          green={modalColor === 'black'}
          label="Privacy Policy"
        />
        .
      </Typography>
    </footer>
  );
};
