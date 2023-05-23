import { Dialog } from 'components/Dialog';
import { ModalTitle } from 'components/ModalElements/Title';
import { Maybe, SubscriptionAgreement, SubscriptionAgreementType } from 'reinvest-app-common/src/types/graphql';
import { ModalProps } from 'types/modal';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { AgreementSection } from './AgreementSection';

interface Props extends ModalProps {
  subscriptionAgreement: Maybe<SubscriptionAgreement>;
}

const TITLES = new Map<SubscriptionAgreementType, string>([
  [SubscriptionAgreementType.DirectDeposit, 'Direct Deposit Agreement'],
  [SubscriptionAgreementType.RecurringInvestment, 'Recurring Investment Agreement'],
]);

export function DialogSubscriptionAgreement({ isModalOpen, onModalOpenChange, subscriptionAgreement }: Props) {
  const title = subscriptionAgreement?.type && TITLES.get(subscriptionAgreement.type);

  return (
    <Dialog
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
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
