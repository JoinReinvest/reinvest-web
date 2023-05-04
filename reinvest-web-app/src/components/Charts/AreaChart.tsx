import dayjs from 'dayjs';
import { Area, AreaChart as PrimitiveAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { CustomTooltip } from './Tooltip';
const toDolars = (value: number) => `$${value.toFixed(0)}`;
const currentDate = dayjs();
const format = (date: dayjs.Dayjs) => dayjs(date).format('ddd, MMM D');

const chartData = [
  {
    date: format(dayjs(currentDate).subtract(111, 'day')),
    value: 100,
  },
  {
    date: format(dayjs(currentDate).subtract(10, 'day')),
    value: 200,
  },
  {
    date: format(dayjs(currentDate).subtract(9, 'day')),
    value: 500,
  },
  {
    date: format(dayjs(currentDate).subtract(8, 'day')),
    value: 1500,
  },
  {
    date: format(dayjs(currentDate).subtract(7, 'day')),
    value: 2000,
  },
  {
    date: format(dayjs(currentDate).subtract(6, 'day')),
    value: 1500,
  },
  {
    date: format(dayjs(currentDate).subtract(5, 'day')),
    value: 1890,
  },
  {
    date: format(dayjs(currentDate).subtract(4, 'day')),
    value: 2390,
  },
  {
    date: format(dayjs(currentDate).subtract(3, 'day')),
    value: 3490,
  },
  {
    date: format(dayjs(currentDate).subtract(2, 'day')),
    value: 2590,
  },
  {
    date: format(dayjs(currentDate).subtract(1, 'day')),
    value: 2010,
  },
  {
    date: format(currentDate),
    value: 3123,
  },
];

const maxDomain = Math.max(...chartData.map(item => item.value)) * 1.3;
const minDomain = 0;

export const AreaChart = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PrimitiveAreaChart data={chartData}>
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
          tickFormatter={toDolars}
          mirror
          domain={[minDomain, maxDomain]}
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
