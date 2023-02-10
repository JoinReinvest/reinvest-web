import { BlackModal } from 'components/BlackModal';
import { AvatarEditable } from 'components/FormElements/AvatarEditable';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const ResidencyStatusPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Upload Profile Picture" />

        <div className="flex flex-col items-center gap-24">
          <AvatarEditable
            name="profile-picture"
            onChange={file => {
              console.info(file); // eslint-disable-line
            }}
            size="xl"
          />

          <Typography
            variant="paragraph-large"
            className="text-white/50"
          >
            Customize your profile picture
          </Typography>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default ResidencyStatusPage;
