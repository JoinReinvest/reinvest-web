import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconDisabled } from 'assets/icons/IconDisabled';
import { IconSearch } from 'assets/icons/IconSearch';
import cx from 'classnames';
import { MouseEvent, ReactNode, RefObject } from 'react';

import { InputControlErrorMessage } from './InputControlErrorMessage';
import { InputControlPlaceholder } from './InputControlPlaceholder';

interface InputControlProps {
  children: ReactNode;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement>;
  value: string;
  error?: string;
  focused?: boolean;
  placeholder?: string;
  showArrowIcon?: boolean;
  showSearchIcon?: boolean;
}

export const InputControl = ({
  inputRef,
  focused,
  error,
  children,
  placeholder,
  value = '',
  disabled,
  showArrowIcon = false,
  showSearchIcon = false,
}: InputControlProps) => {
  const clickHandler = (event: MouseEvent) => {
    if (inputRef?.current === document.activeElement) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    inputRef?.current?.focus();
  };
  const isDirty = focused || !!value;
  const isDirtyAndEnabled = focused && !disabled;

  const containerClasses = cx({
    'input w-full relative text-secondary-3 flex items-center gap-x-10 mb-10 border p-14 border-secondary-4 transition-[transform,color] hover:border-green-frost-solid':
      true,
    'border-green-frost-solid shadow-focused-input !text-black': isDirtyAndEnabled,
    '!border-secondary-error bg-secondary-error/5 shadow-transparent mb-26': error,
    'bg-secondary-6 border-secondary-4 pointer-events-none': disabled,
    'pl-8': showSearchIcon,
    'pr-8': showArrowIcon,
  });

  const contentClass = cx({
    'flex-1 h-[1.75rem]': true,
    'ml-[42px]': showSearchIcon,
    'mr-[42px]': showArrowIcon,
  });

  const iconLeftClass = cx({
    absolute: true,
    'stroke-gray-light': !!disabled,
  });

  const iconRightClass = cx({
    [iconLeftClass]: true,
    'right-0': true,
  });

  return (
    <div
      role="none"
      onClick={clickHandler}
      className={containerClasses}
    >
      {showSearchIcon && <IconSearch className={iconLeftClass} />}

      <div className={contentClass}>
        {placeholder && (
          <InputControlPlaceholder
            placeholder={placeholder}
            isInputDirty={isDirty}
            isInputDisabled={disabled}
          />
        )}

        <div className="flex top-6 relative">
          <span className="flex-1">{children}</span>
        </div>
      </div>

      {showArrowIcon && !disabled ? <IconArrowDown className={iconRightClass} /> : <IconDisabled className={iconRightClass} />}

      {!!error && <InputControlErrorMessage message={error} />}
    </div>
  );
};
