interface ChartAreaGradientProps {
  id: string;
}

export const ChartAreaGradient = ({ id }: ChartAreaGradientProps) => (
  <linearGradient
    id={id}
    gradientTransform="180deg"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >
    <stop
      offset="-9.2%"
      stopColor="#C1EBD9"
    />
    <stop
      offset="-19.19%"
      stopColor="#C1EBD9"
    />
    <stop
      offset="150.92%"
      stopColor="#ffffff"
    />
  </linearGradient>
);
