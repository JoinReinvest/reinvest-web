import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { FieldValues } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields> {
  options: SelectionOption[];
  className?: string;
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
}: Props<FormFields>) {
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
          className={cx(
            'px-36 py-24 border',
            'state-checked:bg-green-frost-01 state-checked:text-black-01 state-checked:border-green-frost-01',
            'state-unchecked:text-gray-03 state-unchecked:border-gray-03',
          )}
        >
          <Typography variant="paragraph-large">{option.title}</Typography>

          {option.description && (
            <Typography
              className="text-gray-03"
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
