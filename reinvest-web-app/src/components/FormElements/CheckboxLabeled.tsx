import { ComponentProps, PropsWithChildren } from 'react';
import { Checkbox } from 'components/FormElements/Checkbox';
import { FieldValues } from 'react-hook-form';
import { Typography } from 'components/Typography';

type PrimitiveProps<FormFields extends FieldValues> = ComponentProps<typeof Checkbox<FormFields>>;

interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields>, PropsWithChildren {}

export function CheckboxLabeled<FormFields extends FieldValues>({ children, ...props }: Props<FormFields>) {
  return (
    <label
      htmlFor={props.name}
      className="flex gap-16 items-start first:flex-none"
    >
      <div className='pt-2'>
        <Checkbox {...props} shouldUnregister />
      </div>

      <Typography className='contents' variant="paragraph-large">{children}</Typography>
    </label>
  );
}
