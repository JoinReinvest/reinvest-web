import { IconEmptyCalendar } from '../../assets/icons/Dashboard/IconEmptyCalendar';
import { Typography } from '../Typography';

const emptyDashboardChartTitle = 'Make an investment now for generating the chart';

export const EmptyChart = () => {
  return (
    <div className="flex flex-col gap-8 px-72 py-36 lg:w-full lg:justify-center lg:gap-24 lg:py-160">
      <IconEmptyCalendar className="lg:max-w-342 mx-auto h-115 w-100 lg:h-full lg:max-h-300 lg:w-full" />
      <Typography
        variant="paragraph-emphasized"
        className="text-center text-gray-02 lg:hidden"
      >
        {emptyDashboardChartTitle}
      </Typography>
      <Typography
        variant="h6"
        className="hidden text-center text-gray-02 lg:block"
      >
        {emptyDashboardChartTitle}
      </Typography>
    </div>
  );
};
