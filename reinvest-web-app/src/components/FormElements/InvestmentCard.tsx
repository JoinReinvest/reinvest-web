import * as RadioGroup from '@radix-ui/react-radio-group';
import cx from 'classnames';
import { ButtonLink } from 'components/ButtonLink';
import { InputMasked } from 'components/FormElements/InputMasked';
import { Typography } from 'components/Typography';
import { useController, useForm } from 'react-hook-form';
import { INVESTMENT_PRESET_AMOUNTS } from 'reinvest-app-common/src/constants/investment-amounts';

interface Props {
  currentBankAccount: string;
  onChange: (value?: number) => void;
  onChangeBankAccount: () => void;
  className?: string;
  defaultValue?: number;
}

interface Fields {
  customAmount?: number;
  presetAmount?: string;
}

export function InvestmentCard({ defaultValue, currentBankAccount, onChangeBankAccount, onChange, className }: Props) {
  const defaultValues: Fields = { presetAmount: '', customAmount: defaultValue };
  const form = useForm<Fields>({ defaultValues: async () => defaultValues });
  const { field: presetField } = useController({ control: form.control, name: 'presetAmount' });

  const onPresetFieldChange = (value: string) => {
    const numericValue = parseInt(value);

    form.setValue('customAmount', numericValue);
    presetField.onChange({ target: { value } });

    onChange(numericValue);
  };

  const onCustomFieldChange = (event: { target: { value: number | string } }) => {
    if (event.target.value !== '') {
      const { value } = event.target;
      const numericValue = typeof value === 'string' ? parseInt(value) : value;

      if (`${value}` !== presetField.value) {
        presetField.onChange({ target: { value: '' } });
      }

      form.setValue('customAmount', numericValue);
      onChange(numericValue);
    }
  };

  return (
    <div className={cx('flex w-full max-w-330 flex-col gap-16 border border-gray-03 p-16', className)}>
      <RadioGroup.Root
        name={presetField.name}
        value={presetField.value}
        ref={presetField.ref}
        onBlur={presetField.onBlur}
        orientation="horizontal"
        onValueChange={onPresetFieldChange}
        loop
        dir="ltr"
        className="flex justify-between gap-8"
      >
        {INVESTMENT_PRESET_AMOUNTS.map(option => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className={cx(
              'py-15 border basis-full',
              'state-checked:bg-black-01 state-checked:text-white state-checked:border-transparent',
              'state-unchecked:bg-white state-unchecked:text-black state-unchecked:border-gray-03',
            )}
          >
            <Typography variant="button">{option.label}</Typography>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      <InputMasked
        name="customAmount"
        control={form.control}
        rules={{ onChange: onCustomFieldChange }}
        maskOptions={{
          mask: '$num',
          blocks: {
            num: {
              mask: Number,
              min: 1,
              thousandsSeparator: ',',
            },
          },
        }}
        placeholder="+ Add custom amount"
      />

      <div className="flex flex-col gap-16">
        <Typography variant="paragraph">{currentBankAccount}</Typography>

        <Typography variant="paragraph">You can have 1 bank account connected to your REINVEST profile.</Typography>

        <ButtonLink
          onClick={onChangeBankAccount}
          label="Change bank account"
        />
      </div>
    </div>
  );
}
