import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import dayjs from 'dayjs';
import IMask from 'imask';
import { FieldValues } from 'react-hook-form';

type Props<FormFields extends FieldValues> = CustomInputMaskedProps<FormFields>;

export function InputBirthDate<FormFields extends FieldValues>(props: Props<FormFields>) {
  const maxDate = dayjs().toDate();
  const minDate = dayjs(maxDate).subtract(100, 'years').toDate();
  const dateFormat = 'MM/DD/YYYY';

  return (
    <InputMasked
      maskOptions={{
        mask: Date,
        pattern: 'm{/}`d{/}`YYYY',
        min: minDate,
        max: maxDate,
        blocks: {
          m: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 1, to: 12, maxLength: 2 },
          d: { mask: IMask.MaskedRange, placeholderChar: 'D', from: 1, to: 31, maxLength: 2 },
          Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: 1900, to: 9999, maxLength: 4 },
        },
        format: value => {
          const date = dayjs(value);

          return date.format(dateFormat);
        },
        parse: value => {
          const date = dayjs(value, dateFormat).toDate();

          return new Date(date);
        },
      }}
      placeholder="Date of Birth"
      {...props}
    />
  );
}
