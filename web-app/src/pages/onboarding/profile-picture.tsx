import { BlackModal } from 'components/BlackModal';
import { EditableAvatar } from 'components/FormElements/EditableAvatar';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Title } from '../../components/Title';

const ResidencyStatusPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title=" Upload Profile Picture" />

        <EditableAvatar
          name="profile-picture"
          onChange={file => {
            console.info(file) // eslint-disable-line
          }}
          altText="avatar"
        />

        <Typography
          variant="paragraph-large"
          className="text-white/50"
        >
          Customize your profile picture
        </Typography>
      </BlackModal>
    </MainLayout>
  );
};

export default ResidencyStatusPage;
