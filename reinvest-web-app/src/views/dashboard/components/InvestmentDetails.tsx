import { IconInfo } from 'assets/icons/IconInfo';
import { Typography } from 'components/Typography';

interface Props {
  title: string;
  earnedMoney?: string;
  onClick?: () => void;
}

export const InvestmentDetails = ({ earnedMoney, title, onClick }: Props) => {
  return (
    <div className="flex justify-between px-24 py-14">
      <div className="flex items-center gap-8">
        <Typography variant="paragraph-large">{title}</Typography>

        <button onClick={onClick}>
          <IconInfo />
        </button>
      </div>

      <Typography variant="paragraph-large">{earnedMoney || 0}</Typography>
    </div>
  );
};
