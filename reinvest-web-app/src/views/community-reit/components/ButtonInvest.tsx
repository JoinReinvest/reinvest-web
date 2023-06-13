import { Button } from 'components/Button';

import { useModalManager } from '../providers/ModalManager';

const BUTTON_LABEL = 'Invest Now';

export function ButtonInvest() {
  const { onInvestmentModalOpenChange } = useModalManager();

  function onButtonClick() {
    onInvestmentModalOpenChange(true);
  }

  return (
    <div className="min-w-200">
      <Button
        label={BUTTON_LABEL}
        onClick={onButtonClick}
      />
    </div>
  );
}
