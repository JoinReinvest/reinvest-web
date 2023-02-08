import { BlackModal } from 'components/BlackModal';
import { CircleFailure } from 'components/CircleFailure';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

const OnboardingSocialSecurityNumberFailurePage: NextPage = () => (
  <MainLayout>
    <BlackModal isOpen={true}>
      <div className="flex flex-col items-center gap-96">
        <Typography
          variant="heading-5"
          className="text-center"
        >
          We cannot verify your Social Secuirty at this time
        </Typography>

        <CircleFailure />
      </div>
    </BlackModal>
  </MainLayout>
);

export default OnboardingSocialSecurityNumberFailurePage;
