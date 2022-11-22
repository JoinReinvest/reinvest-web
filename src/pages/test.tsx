import { Button } from 'components/Button';
import { Switch } from 'components/Switch';
import { TextInput } from 'components/TextInput/index';
import { NextPage } from 'next';
import { useState } from 'react';

const TestPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [checked, setIsChecked] = useState(false);

  return (
    <div className="p-4">
      <div className="max-w-lg">
        <TextInput
          name="sample name"
          placeholder="placeholder"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
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
        onChange={state => setIsChecked(state)}
      />
    </div>
  );
};

export default TestPage;
