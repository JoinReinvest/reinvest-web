import { Accordion } from 'components/Accordion';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Select } from 'components/Select';
import { Stepper } from 'components/Stepper';
import { Switch } from 'components/Switch';
import { TextInput } from 'components/TextInput/index';
import { NextPage } from 'next';
import { useState } from 'react';

const TestPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);

  return (
    <>
      <div className="p-4">
        <div className="max-w-lg">
          <TextInput
            name="sample name"
            placeholder="placeholder"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
          />

          <Select
            name="select"
            placeholder="Net Income"
            value={selectValue}
            onChange={option => setSelectValue(option?.value)}
            options={[
              { label: '$0 - $25,000', value: 'first' },
              { label: '$26,000 - $99,000', value: 'second' },
              { label: '$100,000 - $499,000', value: 'third' },
              { label: '$500,000 - $999,000', value: 'fourth' },
              { label: '$1,000,000 or more', value: 'fifth' },
            ]}
          />
        </div>

        <div className="max-w-md">
          <Button
            label="Submit me"
            variant="default"
            size="sm"
            className="mr-2"
          />

          <Button
            label="Button"
            variant="outlined"
            size="lg"
          />
        </div>

        <Switch
          isChecked={checked}
          onChange={state => setChecked(state)}
        />

        <Checkbox
          isChecked={checked}
          onChange={state => setChecked(state)}
        />
      </div>

      <div className="p-24 flex gap-10">
        <div>
          <Accordion
            title="Account Setup"
            titleSize="lg"
            subtitle="Finish all the steps and start investing"
            isIconRounded
          >
            <Accordion
              title="Question Here"
              isChild
            >
              <p>Answer here</p>
            </Accordion>
            <Accordion
              title="Question Here"
              isChild
            >
              <p>Answer here</p>
            </Accordion>
            <Accordion
              title="Question Here"
              isChild
            >
              <p>Answer here</p>
            </Accordion>
          </Accordion>
        </div>
      </div>

      <div className="max-w-md">
        <Stepper steps={['Deposited', 'Received', 'Invested']} />
      </div>
    </>
  );
};

export default TestPage;
