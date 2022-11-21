import { Checkbox as PrimitiveCheckbox, CheckboxProps as PrimitiveCheckboxProps } from '@hookooekoo/ui-checkbox';
import { IconCheckmark } from 'assets/icons/IconCheckmark';

type Props = Omit<PrimitiveCheckboxProps, 'children'>;

export const Checkbox = ({ isChecked = false, onChange, isDisabled = false }: Props) => (
  <PrimitiveCheckbox
    isDisabled={isDisabled}
    isChecked={isChecked}
    onChange={onChange}
  >
    <IconCheckmark className="max-w-full max-h-full" />
  </PrimitiveCheckbox>
);
