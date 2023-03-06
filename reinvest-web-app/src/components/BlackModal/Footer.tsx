import { OpenModalLink } from 'components/Links/OpenModalLink';
import { PrivacyPolicyBlackModal } from 'components/PrivacyPolicyBlackModal';
import { TermsAndConditioncBlackModal } from 'components/TermsAndConditioncBlackModal';
import { Typography } from 'components/Typography';
import { useState } from 'react';

export const Footer = () => {
  const [isTermsAndConditionsOpen, setIsTermsAndConditionsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const onChangeTermsAndConditions = () => {
    setIsTermsAndConditionsOpen(!isTermsAndConditionsOpen);
  };

  const onChangePrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(!isPrivacyPolicyOpen);
  };

  return (
    <footer className="w-330 mx-auto text-center">
      <TermsAndConditioncBlackModal
        isOpen={isTermsAndConditionsOpen}
        onOpenChange={onChangeTermsAndConditions}
      />
      <PrivacyPolicyBlackModal
        isOpen={isPrivacyPolicyOpen}
        onOpenChange={onChangePrivacyPolicy}
      />
      <Typography variant="paragraph">
        By continuing, you agree to the REINVEST
        <br />
        <OpenModalLink
          onClick={onChangeTermsAndConditions}
          label="Terms of Conditions"
        />{' '}
        and{' '}
        <OpenModalLink
          onClick={onChangePrivacyPolicy}
          label="Privacy Policy"
        />
        .
      </Typography>
    </footer>
  );
};
