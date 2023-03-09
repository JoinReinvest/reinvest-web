import { Checkbox } from 'components/FormElements/Checkbox';
import { Typography } from 'components/Typography';
import { ComponentProps, PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';

type PrimitiveProps<FormFields extends FieldValues> = ComponentProps<typeof Checkbox<FormFields>>;

interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields>, PropsWithChildren {}

export function CheckboxLabeled<FormFields extends FieldValues>({ children, ...props }: Props<FormFields>) {
  return (
    <label
      htmlFor={props.name}
      className="flex items-start gap-16 first:flex-none"
    >
      <div className="pt-2">
        <Checkbox
          {...props}
          shouldUnregister
        />
      </div>

      <Typography
        className="contents"
        variant="paragraph-large"
      >
        {children}
      </Typography>
    </label>
  );
}
