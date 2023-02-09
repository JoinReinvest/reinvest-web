import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { BlackModal } from 'components/BlackModal';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactNode, useEffect, useMemo, useState } from 'react';

interface Props {
  hasSucceded: boolean;
  isLoading: boolean;
}

interface Status {
  icon: ReactNode;
  title: string;
}

export const OnboardingIdentificationSuccessPage = ({ isLoading, hasSucceded }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const { title, icon } = useMemo<Status>(() => {
    if (!isLoading && hasSucceded) {
      return { title: 'Account Information Verified!', icon: <IconCheckCircle /> };
    }

    if (!isLoading && !hasSucceded) {
      return { title: 'We cannot approve your account at this time', icon: <IconXCircle /> };
    }

    return { title: 'Verifying Account Information', icon: <IconSpinner /> };
  }, [isLoading, hasSucceded]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <div className="flex flex-col items-center gap-36">
          <Typography
            variant="h5"
            className="text-center"
          >
            {title}
          </Typography>

          {icon}
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      isLoading: true,
      hasSucceded: false,
    },
  };
};

export default OnboardingIdentificationSuccessPage;
