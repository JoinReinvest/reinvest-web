import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { FieldValues } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields> {
  options: SelectionOption[];
  className?: string;
  forWhiteBackground?: boolean;
  paddingSize?: 'md' | 'lg';
}

export interface SelectionOption {
  title: string;
  value: string;
  description?: string;
}

type PrimitiveProps<FormFields extends FieldValues> = Omit<PrimitiveRadioGroupProps<FormFields>, 'className' | 'loopNavigation' | 'children'>;

export function SelectionCards<FormFields extends FieldValues>({
  name,
  control,
  options,
  required = false,
  disabled = false,
  orientation = 'vertical',
  readingDirection = 'ltr',
  defaultValue,
  rules,
  shouldUnregister,
  className,
  forWhiteBackground = false,
  paddingSize = 'lg',
}: Props<FormFields>) {
  const itemClassName = cx(['border', 'state-checked:bg-green-frost-01 state-checked:border-green-frost-01'], {
    'px-36 py-16': paddingSize === 'md',
    'px-36 py-24': paddingSize === 'lg',
    'text-black-01 state-unchecked:hover:border-green-frost-01 state-unchecked:border-black-01': forWhiteBackground,
    'state-checked:text-black-01 state-unchecked:text-gray-03 state-unchecked:border-gray-03': !forWhiteBackground,
  });

  const titleClassName = cx({
    'text-black-01': forWhiteBackground,
    'text-white': !forWhiteBackground,
  });

  const descriptionClassName = cx({
    'text-black-01': forWhiteBackground,
    'text-gray-03': !forWhiteBackground,
  });

  return (
    <RadioGroup
      name={name}
      control={control}
      required={required}
      disabled={disabled}
      orientation={orientation}
      readingDirection={readingDirection}
      loopNavigation
      className={cx('selection-cards', className)}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      rules={rules}
    >
      {options.map(option => (
        <RadioGroupItem
          key={option.value}
          value={option.value}
          className={itemClassName}
        >
          <Typography
            variant="paragraph-large"
            className={titleClassName}
          >
            {option.title}
          </Typography>

          {option.description && (
            <Typography
              className={descriptionClassName}
              variant="paragraph-small"
            >
              {option.description}
            </Typography>
          )}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
