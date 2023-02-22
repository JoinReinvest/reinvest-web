import { BlackModal } from 'components/BlackModal';
import { Select } from 'components/Select';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { ComponentProps, useEffect, useState } from 'react';

import { Input } from '../../components/FormElements/Input';
import { Title } from '../../components/Title';

const INDUSTRIES: ComponentProps<typeof Select>['options'] = ['Aerospace', 'Engineering', 'Design', 'Manufacturing', 'Marketing'].map(industry => ({
  label: industry,
  value: industry.toLowerCase().split(' ').join('-'),
}));

const OnboardingEmploymentLocationPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formFields, setFormFields] = useState({
    employer: '',
    title: '',
    industry: '',
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
        <Title title="Where are you employed?" />

        <form className="flex flex-col gap-16">
          <Input
            name="employment-employer"
            value={formFields.employer}
            onChange={({ target }) => updateField({ employer: target.value })}
            placeholder="Name of Employer"
            required
          />

          <Input
            name="employment-title"
            value={formFields.title}
            onChange={({ target }) => updateField({ title: target.value })}
            placeholder="Title"
            required
          />

          <Select
            name="employment-industry"
            value={formFields.industry}
            onChange={option => {
              updateField({ industry: option?.value });
            }}
            placeholder="Industry"
            options={INDUSTRIES}
          />
        </form>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingEmploymentLocationPage;
