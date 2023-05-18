import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Typography } from 'components/Typography';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

type Props = Pick<ReactDatePickerCustomHeaderProps, 'date' | 'increaseMonth'>;

export const Header = ({ date, increaseMonth }: Props) => {
  const dateFormatted = formatDate(date, 'DATE_PICKER');

  return (
    <header className="flex items-center justify-between px-24 py-12">
      <Typography
        variant="paragraph-emphasized"
        className="text-black-01/60"
      >
        {dateFormatted}
      </Typography>

      <button
        type="button"
        className="bg-transparent outline-none"
        onClick={increaseMonth}
      >
        <IconArrowRight className="child:stroke-gray-01" />
      </button>
    </header>
  );
};
