import { BlackModal } from 'components/BlackModal';
import { InputFile } from 'components/InputFile';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const OnboardingIdentificationPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [document, setDocument] = useState<File | null>(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <div className="flex flex-col gap-36">
          <Typography
            variant="h5"
            className="text-center"
          >
            Please upload your Driver&apos;s License or Passport for further verification
          </Typography>

          <InputFile
            label="Document 1"
            name="identification"
            placeholder="Upload File"
            file={document}
            onChange={setDocument}
            accepts="image/*,.pdf"
          />
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingIdentificationPage;
