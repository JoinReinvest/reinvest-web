import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group'

import { ChartControlProps } from './interfaces'

export const ChartControls = ({ options, value, onChange, name, required = false, disabled = false }: ChartControlProps) => {
  return (
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
      className="flex justify-evenly"
      required={required}
      disabled={disabled}
      orientation="horizontal"
      readingDirection="ltr"
      loopNavigation
    >
      {options.map(({ label, value }) => (
        <RadioGroupItem
          key={value}
          value={value}
          className="mb-8 px-4 text-11 text-medium uppercase border-b-[2px] border-b-transparent data-[state='checked']:text-black data-[state='checked']:border-b-black data-[state='unchecked']:text-gray-light"
        >
          <p>{label}</p>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}
