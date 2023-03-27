import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import dayjs from 'dayjs';
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
        pattern: 'm{/}`d{/}`Y',
        min: minDate,
        max: maxDate,
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
      willTriggerChangeOnCompletion
      willUseUnmaskedValue={false}
      willTriggerChangeOnAccept={false}
    />
  );
}
