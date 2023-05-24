import { Typography } from '../Typography';

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: { value: number }[];
}

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-8 py-4">
        <Typography variant="paragraph-large">$ {payload[0]?.value}</Typography>
        <Typography variant="paragraph-large">{label}</Typography>
      </div>
    );
  }

  return null;
};
