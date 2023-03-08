import { BlackModal } from 'components/BlackModal';
import { RadioGroupOptionItem, RadioGroupOptions } from 'components/FormElements/RadioGroupOptions';
import { Title } from 'components/Title';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const followingApplies: RadioGroupOptionItem[] = [
  {
    title:
      'Are you or anyone in your immediate household, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.',
    value: 'option1',
  },
  {
    title:
      'Are you or anyone in your household or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?',
    value: 'option2',
  },
  {
    title: 'Are you or any of your immediate family a senior political figure?',
    value: 'option3',
  },
  {
    title: 'None of the above apply',
    value: 'option4',
  },
];

const FollowingApplyPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<{ selected: string }>();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <BlackModal isOpen={isOpen}>
      <Title title="Do any of the following apply to you?" />
      <RadioGroupOptions
        name="selected"
        control={form.control}
        options={followingApplies}
        className="following-apply"
      />
    </BlackModal>
  );
};

export default FollowingApplyPage;
