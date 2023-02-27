import { BlackModal } from 'components/BlackModal';
import { RadioGroupOptions } from 'components/RadioGroupOptions';
import { RadioGroupOption } from 'components/RadioGroupOptions/interfaces';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const followingApplies: RadioGroupOption[] = [
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

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Do any of the following apply to you?" />
        <RadioGroupOptions
          options={followingApplies}
          className="following-apply"
        />
      </BlackModal>
    </MainLayout>
  );
};

export default FollowingApplyPage;
