import { Dialog } from 'components/Dialog';
import { ModalTitle } from 'components/ModalElements/Title';
import { FundsWithdrawalAgreement, Maybe, SubscriptionAgreement, SubscriptionAgreementType } from 'reinvest-app-common/src/types/graphql';
import { ModalProps } from 'types/modal';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { AgreementSection } from './AgreementSection';

interface Props extends ModalProps {
  subscriptionAgreement: Maybe<SubscriptionAgreement | FundsWithdrawalAgreement>;
}

const FUNDS_WITHDRAWAL_AGREEMENT_TITLE = 'Withdrawal request Agreement';
const SUBSCRIPTION_AGREEMENT_TITLES = new Map<SubscriptionAgreementType, string>([
  [SubscriptionAgreementType.DirectDeposit, 'Direct Deposit Agreement'],
  [SubscriptionAgreementType.RecurringInvestment, 'Recurring Investment Agreement'],
]);

export function DialogSubscriptionAgreement({ isModalOpen, onModalOpenChange, subscriptionAgreement }: Props) {
  const isForSubscriptionAgreement = isNotForFundsWithdrawal(subscriptionAgreement);
  const title = isForSubscriptionAgreement ? SUBSCRIPTION_AGREEMENT_TITLES.get(subscriptionAgreement.type) : FUNDS_WITHDRAWAL_AGREEMENT_TITLE;

  return (
    <Dialog
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
      color="white"
    >
      <>
        {title && <ModalTitle title={title} />}

        <div className="flex flex-col gap-24">
          {subscriptionAgreement?.content?.map(section => (
            <AgreementSection
              key={lowerCaseWithoutSpacesGenerator(section?.header || '')}
              section={section}
            />
          ))}
        </div>
      </>
    </Dialog>
  );
}

function isNotForFundsWithdrawal(
  subscriptionAgreement: Maybe<SubscriptionAgreement | FundsWithdrawalAgreement>,
): subscriptionAgreement is SubscriptionAgreement {
  return (subscriptionAgreement as SubscriptionAgreement)?.type !== undefined;
}
