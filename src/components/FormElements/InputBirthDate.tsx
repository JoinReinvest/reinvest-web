import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends CustomInputMaskedProps<FormFields> {
  maxDate?: Date;
  minDate?: Date;
}

export function InputBirthDate<FormFields extends FieldValues>({ minDate = new Date(1900, 0, 1), maxDate = new Date(), ...props }: Props<FormFields>) {
  return (
    <InputMasked
      maskOptions={{
        mask: Date,
        pattern: 'm{/}`d{/}`Y',
        min: minDate,
        max: maxDate,
        format: date => {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        },
        parse: dateString => {
          const dateParsed = dateString.split('/').join(', ');

          return new Date(dateParsed);
        },
      }}
      placeholder="Date of Birth"
      {...props}
    />
  );
}
