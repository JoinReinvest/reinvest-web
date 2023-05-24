import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import dayjs from 'dayjs';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

type PrimitiveProps = Pick<ReactDatePickerCustomHeaderProps, 'date' | 'increaseMonth'>;
interface Props extends PrimitiveProps {
  startDate: Date;
}

export const Header = ({ date, startDate, increaseMonth }: Props) => {
  const haveSameMonth = dayjs(date).isSame(startDate, 'month');
  const dateFormatted = formatDate(date, 'DATE_PICKER');

  const buttonClassName = cx({
    'bg-transparent outline-none': haveSameMonth,
    hidden: !haveSameMonth,
  });

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
        className={buttonClassName}
        onClick={increaseMonth}
        disabled={!haveSameMonth}
      >
        <IconArrowRight className="child:stroke-gray-01" />
      </button>
    </header>
  );
};
