import { Typography } from 'components/Typography';

import { useFundsWithdrawalManager } from '../providers/FundsWithdrawal';

const TITLE = 'Withdraw Funds';
const ACCOUNT_VALUE_LABEL = 'Account Value';

export function AccountValuePreview() {
  const { simulation } = useFundsWithdrawalManager();

  return (
    <>
      <Typography variant="h5">{TITLE}</Typography>

      <div className="flex flex-col gap-8">
        <Typography variant="h6">{ACCOUNT_VALUE_LABEL}</Typography>
        <Typography variant="custom-1">{simulation?.accountValue.formatted}</Typography>
      </div>
    </>
  );
}
