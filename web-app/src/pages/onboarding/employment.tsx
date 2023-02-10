import { BlackModal } from 'components/BlackModal';
import { TextInput } from 'components/FormElements/TextInput';
import { Select } from 'components/Select';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { ComponentProps, useEffect, useState } from 'react';

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
        <div className="flex flex-col max-lg:gap-60 lg:gap-36">
          <Typography
            variant="h5"
            className="lg:text-center"
          >
            Where are you employed?
          </Typography>

          <form className="flex flex-col gap-16">
            <TextInput
              name="employment-employer"
              value={formFields.employer}
              onChange={({ target }) => updateField({ employer: target.value })}
              placeholder="Name of Employer"
              required
            />

            <TextInput
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
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingEmploymentLocationPage;
