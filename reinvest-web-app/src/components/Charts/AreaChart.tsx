import { Area, AreaChart as PrimitiveAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartDataPoint, ChartDataPointDomains } from 'types/chart';
import { maskCurrency } from 'utils/currency';

import { CustomTooltip } from './Tooltip';

interface Props {
  dataPoints: ChartDataPoint[];
  domains: ChartDataPointDomains;
}

export const AreaChart = ({ dataPoints, domains }: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PrimitiveAreaChart data={dataPoints}>
        <defs>
          <linearGradient
            id="colorUv"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#C1EBD9"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#C1EBD9"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={false}
          axisLine={false}
        />
        <YAxis
          orientation="right"
          tickFormatter={value => maskCurrency(value)}
          mirror
          domain={[domains.min, domains.max]}
        />
        <Tooltip
          content={<CustomTooltip />}
          wrapperClassName=""
        />
        <Area
          type="monotoneX"
          dataKey="value"
          stroke="#75D3AB"
          strokeWidth="5"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </PrimitiveAreaChart>
    </ResponsiveContainer>
  );
};
