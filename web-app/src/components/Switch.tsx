import { Switch as PrimitiveSwitch, SwitchProps as PrimitiveSwitchProps } from '@hookooekoo/ui-switch';

export const Switch = ({ isChecked, onChange, isDisabled = false }: PrimitiveSwitchProps) => (
  <PrimitiveSwitch
    isChecked={isChecked}
    onChange={onChange}
    isDisabled={isDisabled}
  />
);
