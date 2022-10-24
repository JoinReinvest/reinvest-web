import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@hookooekoo/ui-button';
import { IconAdd } from 'assets/icons/IconAdd';

interface ButtonAddProps extends Pick<BaseButtonProps, 'onClick' | 'disabled'> {
  subtitle: string;
  title: string;
}

export const ButtonAdd = ({ title, subtitle, onClick, disabled = false }: ButtonAddProps) => (
  <BaseButton
    className="p-22 flex items-center gap-x-22 text-left border border-secondary-5"
    onClick={onClick}
    disabled={disabled}
  >
    <IconAdd className="stroke-black" />

    <div>
      <h3 className="text-[15px]">{title}</h3>
      <p className="text-14 text-secondary-2 opacity-[0.6]">{subtitle}</p>
    </div>
  </BaseButton>
);
