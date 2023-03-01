import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { FieldValues } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields> {
  options: RadioGroupOptionItem[];
  className?: string;
}

export interface RadioGroupOptionItem {
  title: string;
  value: string;
}

type PrimitiveProps<FormFields extends FieldValues> = Omit<PrimitiveRadioGroupProps<FormFields>, 'className' | 'loopNavigation' | 'children'>;

export function RadioGroupOptions<FormFields extends FieldValues>({
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
      className={cx('radio-group-options', className)}
      required={required}
      disabled={disabled}
      orientation={orientation}
      readingDirection={readingDirection}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
    >
      {options.map(({ title, value }) => (
        <RadioGroupItem
          key={title}
          value={value}
        >
          <div className="radio-group-options-indicator-container">
            <RadioGroupIndicator>
              <IconCheckmark />
            </RadioGroupIndicator>
          </div>
          <Typography variant="paragraph-large">{title}</Typography>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
