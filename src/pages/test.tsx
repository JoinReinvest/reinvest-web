import { TextInput } from 'components/TextInput/index';
import { NextPage } from 'next';
import { useState } from 'react';

const TestPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('');

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
    </div>
  );
};

export default TestPage;
