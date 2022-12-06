import { Checkbox as PrimitiveCheckbox, CheckboxProps as PrimitiveCheckboxProps } from '@hookooekoo/ui-checkbox';
import { IconCheckmark } from 'assets/icons/IconCheckmark';

type Props = Omit<PrimitiveCheckboxProps, 'children'>;

export const Checkbox = ({ checked = false, onChange, disabled = false }: Props) => (
  <PrimitiveCheckbox
    disabled={disabled}
    checked={checked}
    onChange={onChange}
  >
    <IconCheckmark className="max-h-full max-w-full" />
  </PrimitiveCheckbox>
);
