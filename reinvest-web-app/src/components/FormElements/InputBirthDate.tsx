import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import dayjs from 'dayjs';
import { FieldValues } from 'react-hook-form';
import { DateFormats } from 'reinvest-app-common/src/constants/date-formats';

type Props<FormFields extends FieldValues> = CustomInputMaskedProps<FormFields>;

export function InputBirthDate<FormFields extends FieldValues>(props: Props<FormFields>) {
  const maxDate = dayjs().toDate();
  const minDate = dayjs(maxDate).subtract(100, 'years').toDate();

  return (
    <InputMasked
      maskOptions={{
        mask: Date,
        pattern: 'm{/}`d{/}`Y',
        min: minDate,
        max: maxDate,
        format: value => dayjs(value).format(DateFormats.DEFAULT),
        parse: value => dayjs(value, DateFormats.DEFAULT).toDate(),
      }}
      {...props}
      placeholder="Date of Birth"
      willTriggerChangeOnCompletion
      willUseUnmaskedValue={false}
      willTriggerChangeOnAccept={false}
      inputPlaceholder={DateFormats.DEFAULT}
      inputMode="numeric"
    />
  );
}
