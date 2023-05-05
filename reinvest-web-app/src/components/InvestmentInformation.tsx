import { IconInvestmentOneTime } from 'assets/icons/IconInvestmentOneTime';
import { IconInvestmentRecurrent } from 'assets/icons/IconInvestmentRecurrent';
import { Typography } from 'components/Typography';
import { formatDateForInvestmentDisplay } from 'reinvest-app-common/src/utilities/dates';
import { maskCurrency } from 'utils/currency';

interface Props {
  amount: number;
  date: Date;
  label: string;
  type: 'one-time' | 'recurring';
}

export const InvestmentInformation = ({ label, amount, type, date }: Props) => {
  const isRecurrent = type === 'recurring';
  const maskedAmount = maskCurrency(amount);
  const dateForDisplay = formatDateForInvestmentDisplay(date);
  const labeledDate = isRecurrent ? `Starting ${dateForDisplay}` : dateForDisplay;

  return (
    <div className="flex flex-col items-center gap-16">
      <Typography variant="paragraph-emphasized">{label}</Typography>

      <div className="flex items-center justify-center">
        {generateIcon(type)}

        <Typography variant="custom-1">{maskedAmount}</Typography>
      </div>

      <Typography
        variant="h6-responsive"
        className="text-gray-02"
      >
        {labeledDate}
      </Typography>
    </div>
  );
};

const generateIcon = (investmentType: Props['type']) => <>{investmentType === 'one-time' ? <IconInvestmentOneTime /> : <IconInvestmentRecurrent />}</>;
