import { Switch as PrimitiveSwitch, SwitchProps as PrimitiveSwitchProps } from '@hookooekoo/ui-switch';

export const Switch = ({ onChange, className, value, inputRef }: PrimitiveSwitchProps) => (
  <PrimitiveSwitch
    className={className}
    onChange={onChange}
    value={value}
    inputRef={inputRef}
  ></PrimitiveSwitch>
);
