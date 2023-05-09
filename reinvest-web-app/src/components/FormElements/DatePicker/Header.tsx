import { Typography } from 'components/Typography';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

type Props = Pick<ReactDatePickerCustomHeaderProps, 'date'>;

export const Header = ({ date }: Props) => {
  const dateFormatted = formatDate(date, 'DATE_PICKER');

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
