import { OpenModalLink } from 'components/Links/OpenModalLink';
import { useToggler } from 'hooks/toggler';
import { PrivacyPolicyBlackModal } from 'views/PrivacyPolicyBlackModal';
import { TermsAndConditioncBlackModal } from 'views/TermsAndConditioncBlackModal';

export const AccountMenuFooter = () => {
  const [isTermsModalOpen, toggleIsTermsModalOpen] = useToggler();
  const [isPrivacyModalOpen, toggleIsPrivacyModalOpen] = useToggler();

  return (
    <>
      <footer className="flex items-center justify-between">
        <OpenModalLink
          onClick={toggleIsPrivacyModalOpen}
          className="text-gray-02"
          label="Privacy Policy"
        />

        <OpenModalLink
          onClick={toggleIsTermsModalOpen}
          className="text-gray-02"
          label="Terms of Conditions"
        />
      </footer>

      <PrivacyPolicyBlackModal
        isOpen={isPrivacyModalOpen}
        onOpenChange={toggleIsPrivacyModalOpen}
      />

      <TermsAndConditioncBlackModal
        isOpen={isTermsModalOpen}
        onOpenChange={toggleIsTermsModalOpen}
      />
    </>
  );
};
