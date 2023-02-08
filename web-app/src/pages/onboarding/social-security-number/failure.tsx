import { BlackModal } from 'components/BlackModal';
import { CircleFailure } from 'components/CircleFailure';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

const OnboardingSocialSecurityNumberFailurePage: NextPage = () => (
  <MainLayout>
    <BlackModal
      isOpen={true}
      onOpenChange={() => {
        console.log(1) // eslint-disable-line
      }}
    >
      <div className="flex flex-col gap-60">
        <Typography
          variant="h5"
          className="lg:text-center"
        >
          We cannot verify your Social Secuirty at this time
        </Typography>

        <Typography variant="paragraph-large">
          Please reach out to{' '}
          <Link
            href="mailto:support@reinvestcommunity.com"
            title="support email"
          >
            support@reinvestcommunity.com
          </Link>
        </Typography>

        <CircleFailure className="self-center" />
      </div>
    </BlackModal>
  </MainLayout>
);

export default OnboardingSocialSecurityNumberFailurePage;
