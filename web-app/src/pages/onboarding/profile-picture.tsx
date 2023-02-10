import { BlackModal } from 'components/BlackModal';
import { AvatarEditable } from 'components/FormElements/AvatarEditable';
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
        <div className="flex flex-col items-center">
          <Typography
            variant="h5"
            className="max-lg:typo-paragraph-large max-lg:order-2 max-lg:font-stretch-normal lg:pb-36"
          >
            Upload Profile Picture
          </Typography>

          <AvatarEditable
            name="profile-picture"
            onChange={file => {
              console.info(file); // eslint-disable-line
            }}
            size="xl"
            className="max-lg:pb-12 lg:pb-24"
          />

          <Typography
            variant="paragraph-large"
            className="text-white/50 max-lg:pt-4"
          >
            Customize your profile picture
          </Typography>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default ResidencyStatusPage;
