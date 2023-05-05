import { Typography } from 'components/Typography';
import dayjs from 'dayjs';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

type Props = Pick<ReactDatePickerCustomHeaderProps, 'date'>;

const DATE_FORMAT = 'MMMM YYYY';

export const Header = ({ date }: Props) => {
  const dateFormatted = dayjs(date).format(DATE_FORMAT);

  return (
    <header className="flex items-start px-24 py-12">
      <Typography
        variant="paragraph-emphasized"
        className="text-black-01/60"
      >
        {dateFormatted}
      </Typography>
    </header>
  );
};
