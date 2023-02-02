import { IconInfo } from 'assets/icons/IconInfo';
import { Accordion } from 'components/Accordion';
import { Button } from 'components/Button';
import { ButtonAdd } from 'components/ButtonAdd';
import { Checkbox } from 'components/Checkbox';
import { Notification } from 'components/Notification';
import { Select } from 'components/Select';
import { Stepper } from 'components/Stepper';
import { Switch } from 'components/Switch';
import { TextInput } from 'components/TextInput';
import { NextPage } from 'next';
import { createRef, useState } from 'react';
import { Typography } from 'components/Typography';
import { MainLayout } from '../layouts/MainLayout';

const Index: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const switchRef = createRef<HTMLInputElement>();

  return (
    <MainLayout>
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
            className="mr-2"
          />
        </div>

        <div className="my-4">
          <ButtonAdd
            title="Heading"
            subtitle="Subtitle goes here"
          />
        </div>

        <Switch
          onChange={state => setChecked(state)}
          className="switch"
          value="swith"
          inputRef={switchRef}
          checked={checked}
          disabled={false}
        />

        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>

      <div className="flex gap-10 p-24">
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

      <section className="p-14">
        <Notification
          title="Dividend Update"
          actions={[
            { label: 'Reinvest', onClick: event => event.preventDefault() },
            { label: 'Withdraw', onClick: event => event.preventDefault() },
          ]}
        >
          <div className="flex items-center gap-x-4">
            <p className="text-14 text-green-deep">You have earned dividends: $10.75</p>
            <IconInfo />
          </div>
        </Notification>
      </section>

      <section className='p-14 flex flex-col gap-8'>
        <Typography variant='heading-1'>Heading 1</Typography>
        <Typography variant='heading-2'>Heading 2</Typography>
        <Typography variant='heading-3'>Heading 3</Typography>
        <Typography variant='heading-4'>Heading 4</Typography>
        <Typography variant='heading-5'>Heading 5</Typography>
        <Typography variant='heading-6'>Heading 6</Typography>
        <Typography variant='bonus-heading'>Bonus Heading</Typography>
        <Typography variant='button'>Button text</Typography>
        <Typography variant='link'>Link text</Typography>
        <Typography variant='paragraph-large'>Paragraph Large</Typography>
        <Typography variant='paragraph-emphasized'>Paragraph Emphasized</Typography>
        <Typography variant='paragraph'>Paragraph</Typography>
        <Typography variant='paragraph-small'>Paragraph Small</Typography>
      </section>
    </MainLayout>
  );
};

export default Index;
