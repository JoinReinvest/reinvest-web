import cx from 'classnames';

interface InputControlPlaceholderProps {
  placeholder: string;
  isInputDirty?: boolean;
  isInputDisabled?: boolean;
}

export const InputControlPlaceholder = ({ placeholder, isInputDirty, isInputDisabled }: InputControlPlaceholderProps) => (
  <span
    className={cx({
      'transition-[transform,color] absolute text-secondary-3 line-clamp-1': true,
      '-z-10 text-base -translate-y-6 top-10': !!isInputDirty,
      ' !text-secondary-3  z-1': !!isInputDisabled,
    })}
  >
    {placeholder}
  </span>
);
