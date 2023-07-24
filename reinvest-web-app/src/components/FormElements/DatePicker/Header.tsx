import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import dayjs from 'dayjs';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

type PrimitiveProps = Pick<ReactDatePickerCustomHeaderProps, 'date' | 'increaseMonth' | 'decreaseMonth'>;
interface Props extends PrimitiveProps {
  startDate: Date;
}

export const Header = ({ date, startDate, increaseMonth, decreaseMonth }: Props) => {
  const haveSameMonth = dayjs(date).isSame(startDate, 'month');
  const dateFormatted = formatDate(date, 'DATE_PICKER');

  const className = cx('flex items-center px-24 py-12 gap-4', {
    'justify-between': haveSameMonth,
  });

  const decreaseMonthButtonClassName = cx({
    'bg-transparent outline-none': !haveSameMonth,
    hidden: haveSameMonth,
  });

  const increaseMonthButtonClassName = cx({
    'bg-transparent outline-none': haveSameMonth,
    hidden: !haveSameMonth,
  });

  return (
    <header className={className}>
      <button
        type="button"
        className={decreaseMonthButtonClassName}
        onClick={decreaseMonth}
        disabled={haveSameMonth}
      >
        <IconArrowLeft className="child:stroke-gray-01" />
      </button>

      <Typography
        variant="paragraph-emphasized"
        className="text-black-01/60"
      >
        {dateFormatted}
      </Typography>

      <button
        type="button"
        className={increaseMonthButtonClassName}
        onClick={increaseMonth}
        disabled={!haveSameMonth}
      >
        <IconArrowRight className="child:stroke-gray-01" />
      </button>
    </header>
  );
};
