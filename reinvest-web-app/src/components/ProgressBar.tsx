import { Indicator, ProgressProps as RootProps, Root } from '@radix-ui/react-progress';

interface Props extends PrimitiveProps {
  maxValue?: RootProps['max'];
}

type PrimitiveProps = Pick<RootProps, 'value'>;

export const ProgressBar = ({ value, maxValue = 100 }: Props) => (
  <div className="relative w-full">
    <Root
      value={value}
      max={maxValue}
      className="absolute h-4 w-full overflow-hidden bg-transparent translate-z-0"
    >
      <Indicator
        className="h-full max-w-full bg-green-frost-01 duration-200 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </Root>
  </div>
);
