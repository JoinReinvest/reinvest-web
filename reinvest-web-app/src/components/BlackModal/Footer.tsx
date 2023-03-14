import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Typography } from 'components/Typography';
import { useState } from 'react';
import { PrivacyPolicyBlackModal } from 'views/PrivacyPolicyBlackModal';
import { TermsAndConditioncBlackModal } from 'views/TermsAndConditioncBlackModal';

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

      <Typography variant="paragraph" className='text-gray-04'>
        By continuing, you agree to the REINVEST
        <br />
        <OpenModalLink
          onClick={onChangeTermsAndConditions}
          green
          label="Terms of Conditions"
        />{' '}
        and{' '}
        <OpenModalLink
          onClick={onChangePrivacyPolicy}
          green
          label="Privacy Policy"
        />
        .
      </Typography>
    </footer>
  );
};
