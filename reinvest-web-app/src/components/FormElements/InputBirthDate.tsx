import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import dayjs from 'dayjs';
import { FieldValues } from 'react-hook-form';
import { DATE_FORMAT } from 'reinvest-app-common/src/constants/date-formats';

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
        format: value => dayjs(value).format(DATE_FORMAT),
        parse: value => dayjs(value, DATE_FORMAT).toDate(),
      }}
      {...props}
      placeholder="Date of Birth"
      willTriggerChangeOnCompletion
      willUseUnmaskedValue={false}
      willTriggerChangeOnAccept={false}
      inputPlaceholder={DATE_FORMAT}
    />
  );
}
