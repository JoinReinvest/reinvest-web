import { IconInvestmentOneTime } from 'assets/icons/IconInvestmentOneTime';
import { IconInvestmentRecurrent } from 'assets/icons/IconInvestmentRecurrent';
import { Typography } from 'components/Typography';
import { maskCurrency } from 'reinvest-app-common/src/utilities/currency';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

interface Props {
  amount: number | string;
  label: string;
  type: 'one-time' | 'recurring';
  date?: Date;
}

export const InvestmentInformation = ({ label, amount, type, date }: Props) => {
  const isRecurrent = type === 'recurring';
  const maskedAmount = typeof amount === 'number' ? maskCurrency(amount) : amount;
  const dateForDisplay = date && formatDate(date, 'INVESTMENT');
  const labeledDate = isRecurrent ? `Starting ${dateForDisplay}` : dateForDisplay;

  return (
    <div className="flex flex-col items-center gap-16">
      <Typography variant="paragraph-emphasized">{label}</Typography>

      <div className="flex items-center justify-center">
        {generateIcon(type)}

        <Typography variant="custom-1">{maskedAmount}</Typography>
      </div>

      {labeledDate && (
        <Typography
          variant="h6-responsive"
          className="text-gray-02"
        >
          {labeledDate}
        </Typography>
      )}
    </div>
  );
};

const generateIcon = (investmentType: Props['type']) => <>{investmentType === 'one-time' ? <IconInvestmentOneTime /> : <IconInvestmentRecurrent />}</>;
