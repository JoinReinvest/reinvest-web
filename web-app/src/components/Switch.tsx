import { Switch as PrimitiveSwitch, SwitchProps as PrimitiveSwitchProps } from '@hookooekoo/ui-switch';

export const Switch = ({ onChange, className, value, inputRef, disabled, checked }: PrimitiveSwitchProps) => (
  <PrimitiveSwitch
    className={className}
    onChange={onChange}
    value={value}
    inputRef={inputRef}
    disabled={disabled}
    checked={checked}
  />
);
