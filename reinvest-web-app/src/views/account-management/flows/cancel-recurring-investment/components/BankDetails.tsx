import { IconBank } from 'assets/icons/IconBank';
import { Typography } from 'components/Typography';
import { BankAccount } from 'reinvest-app-common/src/types/graphql';

interface Props {
  bankAccount: BankAccount | null;
}

export const BankDetails = ({ bankAccount }: Props) => (
  <div className="flex items-center gap-16">
    <IconBank />

    <Typography variant="paragraph-emphasized">
      {bankAccount?.bankName} {bankAccount?.accountNumber}
    </Typography>
  </div>
);
