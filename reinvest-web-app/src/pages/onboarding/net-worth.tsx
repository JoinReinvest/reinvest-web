import { BlackModal } from 'components/BlackModal';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { ComponentProps, useEffect, useState } from 'react';

import { OpenModalLink } from '../../components/Links/OpenModalLink';

const NET_OPTIONS: ComponentProps<typeof Select>['options'] = [
  '$25,000 - $50,000',
  '$50,000 - $75,000',
  '$75,000 - $100,000',
  '$100,000 - $125,000',
  '$125,000 - $150,000',
  '$150,000 - $175,000',
  '$175,000 - $200,000',
].map(item => ({ label: item, value: item.split(' ').join('') }));

const CheckPhonePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formFields, setFormFields] = useState({
    netIncome: '',
    netWorth: '',
  });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const updateField = (fields: Partial<typeof formFields>) => {
    setFormFields({ ...formFields, ...fields });
  };

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="What is approximate net worth and income?" />

        <div className="flex flex-col gap-24">
          <Select
            name="net-income"
            value={formFields.netIncome}
            onChange={option => {
              updateField({ netIncome: option?.value });
            }}
            options={NET_OPTIONS}
            placeholder="Net Income"
            required
          />

          <Select
            name="net-worth"
            value={formFields.netWorth}
            onChange={option => {
              updateField({ netWorth: option?.value });
            }}
            options={NET_OPTIONS}
            placeholder="Net Worth"
            required
          />

          <OpenModalLink
            label="Required. Why?"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}}
          />
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default CheckPhonePage;
