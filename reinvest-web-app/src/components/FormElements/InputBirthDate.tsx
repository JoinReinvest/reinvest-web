import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import dayjs from 'dayjs';
import { FieldValues } from 'react-hook-form';

type Props<FormFields extends FieldValues> = CustomInputMaskedProps<FormFields>;

export function InputBirthDate<FormFields extends FieldValues>(props: Props<FormFields>) {
  const maxDate = dayjs().toDate();
  const minDate = dayjs(maxDate).subtract(100, 'years').toDate();
  const dateFormat = 'MM-DD-YYYY';

  return (
    <InputMasked
      {...props}
      maskOptions={{
        mask: Date,
        pattern: 'm{-}`d{-}`Y',
        min: minDate,
        max: maxDate,
        format: value => dayjs(value).format(dateFormat),
        parse: value => dayjs(value, dateFormat).toDate(),
      }}
      placeholder="Date of Birth"
      willTriggerChangeOnCompletion
      willUseUnmaskedValue={false}
      willTriggerChangeOnAccept={false}
      hasFixedPlaceholder={false}
      inputPlaceholder="MM / DD / YYYY"
    />
  );
}
