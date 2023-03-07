import { BlackModal } from 'components/BlackModal';
import { InputFile } from 'components/FormElements/InputFile';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Title } from '../../../components/Title';

const OnboardingIdentificationPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [_document, setDocument] = useState<File | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <BlackModal isOpen={isOpen}>
      <Title title="Please upload your Driver's License or Passport for further verification" />
      <InputFile
        label="Document 1"
        name="identification_document"
        placeholder="Upload File"
        onChange={setDocument}
        accepts="image/*,.pdf"
      />
    </BlackModal>
  );
};

export default OnboardingIdentificationPage;
