import * as RadioGroup from '@radix-ui/react-radio-group';
import cx from 'classnames';
import { ButtonLink } from 'components/ButtonLink';
import { InputMasked } from 'components/FormElements/InputMasked';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useController, useForm } from 'react-hook-form';
import { INVESTMENT_PRESET_AMOUNTS } from 'reinvest-app-common/src/constants/investment-amounts';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  currentBankAccount: string;
  currentBankAccountType: string;
  onChange: (value?: number) => void;
  onChangeBankAccount: () => void;
  className?: string;
  defaultValue?: number;
}

interface Fields {
  customAmount?: number;
  presetAmount?: string;
}

export function InvestmentCard({ defaultValue, currentBankAccount, onChangeBankAccount, onChange, className, currentBankAccountType }: Props) {
  const { activeAccount } = useActiveAccount();
  // eslint-disable-next-line security/detect-object-injection
  const presetOptions = useMemo(() => INVESTMENT_PRESET_AMOUNTS[activeAccount?.type ?? AccountType.Individual], [activeAccount]);
  const form = useForm<Fields>({ defaultValues: async () => ({ presetAmount: presetOptions[0]?.value, customAmount: defaultValue }) });
  const { field: presetField } = useController({ control: form.control, name: 'presetAmount' });
  const { field: customField } = useController({ control: form.control, name: 'customAmount' });

  const onPresetFieldChange = (value: string) => {
    const parsedValue = parseInt(value);
    form.resetField('customAmount');
    presetField.onChange({ target: { value } });
    customField.onChange({ target: { value: '' } });

    onChange(parsedValue);
  };

  const onCustomFieldChange = (event: { target: { value: string } }) => {
    if (event.target.value !== '') {
      const { value } = event.target;

      if (`${value}` !== presetField.value) {
        presetField.onChange({ target: { value: '' } });
      }

      const parsedValue = parseInt(value);
      form.setValue('customAmount', parsedValue);
      onChange(parsedValue);
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
        {presetOptions.map(option => (
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
        name={customField.name}
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
        <Typography variant="paragraph">
          {currentBankAccountType} {currentBankAccount}
        </Typography>

        <Typography variant="paragraph">You can have 1 bank account connected to your REINVEST profile.</Typography>

        <ButtonLink
          onClick={onChangeBankAccount}
          label="Change bank account"
        />
      </div>
    </div>
  );
}
