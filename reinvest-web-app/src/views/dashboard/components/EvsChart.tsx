import { IconSpinner } from 'assets/icons/IconSpinner';
import cx from 'classnames';
import { AreaChart } from 'components/Charts/AreaChart';
import { useActiveAccountChart } from 'providers/ActiveAccountChart';

export function EvsChart() {
  const { dataPoints, domains, meta } = useActiveAccountChart();

  const classNames = cx('flex h-180 flex-col gap-8 border border-gray-04 lg:h-auto lg:w-full lg:gap-24', {
    'items-center justify-center': !!meta.isLoading,
  });

  return (
    <div
      role="figure"
      className={classNames}
    >
      {meta.isSuccess && domains ? (
        <AreaChart
          dataPoints={dataPoints}
          domains={domains}
        />
      ) : (
        <IconSpinner />
      )}
    </div>
  );
}
