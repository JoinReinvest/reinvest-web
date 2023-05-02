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
  const [isTermsAndConditionsOpen, toggleIsTermsAndConditionsOpen] = useToggler(false);
  const [isPrivacyPolicyOpen, toggleIsPrivacyPolicyOpen] = useToggler(false);

  const className = cx({ 'text-gray-04': modalColor === 'black', 'text-gray-02': modalColor === 'white' });

  return (
    <footer className="w-330 mx-auto text-center">
      <TermsAndConditioncBlackModal
        isOpen={isTermsAndConditionsOpen}
        onOpenChange={toggleIsTermsAndConditionsOpen}
      />
      <PrivacyPolicyBlackModal
        isOpen={isPrivacyPolicyOpen}
        onOpenChange={toggleIsPrivacyPolicyOpen}
      />

      <Typography
        variant="paragraph"
        className={className}
      >
        By continuing, you agree to the REINVEST
        <br />
        <OpenModalLink
          onClick={toggleIsTermsAndConditionsOpen}
          green
          label="Terms of Conditions"
        />{' '}
        and{' '}
        <OpenModalLink
          onClick={toggleIsPrivacyPolicyOpen}
          green
          label="Privacy Policy"
        />
        .
      </Typography>
    </footer>
  );
};
