import { Button as PrimitiveButton, ButtonProps as PrimitiveProps } from '@hookooekoo/ui-button';
import { IconAdd } from 'assets/icons/IconAdd';

interface Props extends Pick<PrimitiveProps, 'onClick' | 'disabled'> {
  subtitle: string;
  title: string;
}

export const ButtonAdd = ({ title, subtitle, onClick, disabled = false }: Props) => (
  <PrimitiveButton
    className="flex items-center gap-x-22 border border-gray-04 p-22 text-left"
    onClick={onClick}
    disabled={disabled}
  >
    <IconAdd className="stroke-black-01" />

    <div>
      <h3 className="text-[15px] font-extended-regular">{title}</h3>
      <p className="text-14 text-gray-01 opacity-[0.6]">{subtitle}</p>
    </div>
  </PrimitiveButton>
);
