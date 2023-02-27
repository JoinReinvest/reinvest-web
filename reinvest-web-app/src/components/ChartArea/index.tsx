import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer } from 'recharts';

import { ChartAreaGradient } from './ChartAreaGradient';

interface ChartAreaProps<TData> {
  data: TData[];
  dataKey: Extract<keyof TData, string>;
  height: number;
}

export function ChartArea<TData>({ data, dataKey, height }: ChartAreaProps<TData>) {
  const gradientId = 'chart-linear-gradient-identifier';
  const gradientIdUrl = `url(#${gradientId})`;

  return (
    <ResponsiveContainer
      minHeight={height}
      width="100%"
    >
      <ComposedChart data={data}>
        <defs>
          <ChartAreaGradient id={gradientId} />
        </defs>

        <Line
          type="monotone"
          strokeLinecap="round"
          strokeWidth={1}
          dataKey={dataKey}
          stroke="#000000"
          dot={false}
          activeDot={false}
          legendType="none"
        />

        <CartesianGrid
          stroke="#000000"
          strokeWidth={0.2}
          opacity={0.5}
          horizontal
          vertical={false}
        />

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#000000"
          strokeWidth={2}
          fillOpacity={1}
          fill={gradientIdUrl}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
