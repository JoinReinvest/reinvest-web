import { IconSpinner } from 'assets/icons/IconSpinner';
import cx from 'classnames';
import { AreaChart } from 'components/Charts/AreaChart';
import { useActiveAccountChart } from 'providers/ActiveAccountChart';

import { EmptyChart } from '../../../components/ChartArea/EmptyChart';

export function EvsChart() {
  const { dataPoints, domains, meta } = useActiveAccountChart();

  const classNames = cx('flex flex-col gap-8 border border-gray-04 lg:h-auto lg:w-full lg:gap-24 bg-white', {
    'items-center justify-center': meta.isLoading,
    'h-180': dataPoints.length,
    'h-auto': !dataPoints.length,
  });

  if (meta.isLoading) {
    return <IconSpinner />;
  }

  return (
    <div
      role="figure"
      className={classNames}
    >
      {meta.isSuccess && domains && !!dataPoints.length && (
        <AreaChart
          dataPoints={dataPoints}
          domains={domains}
        />
      )}
      {meta.isSuccess && domains && !dataPoints.length && <EmptyChart />}
    </div>
  );
}
