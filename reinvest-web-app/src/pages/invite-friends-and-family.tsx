import { NextPage } from 'next';
import { useGetInvitationLink } from 'reinvest-app-common/src/services/queries/getInvitationLink';
import { getApiClient } from 'services/getApiClient';

import { IconLoading } from '../assets/icons/IconLoading';
import { Typography } from '../components/Typography';
import { MainLayout } from '../layouts/MainLayout';

const InvitationsPage: NextPage = () => {
  const { data, isLoading } = useGetInvitationLink(getApiClient);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="my-80 flex justify-center">
          <IconLoading />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h3">Invite friends and family to REINVEST more!</Typography>
      <Typography
        variant="h5"
        className="mt-32"
      >
        Earn up to $10 for every referral
      </Typography>
      <Typography
        variant="h4"
        className="mt-16"
      >
        Your Referral Code: {data?.url?.split('/').pop()}
      </Typography>

      <div className="mt-20 lg:w-1/3">
        <div className="input gap-x-1 hkek-input-text-control relative flex w-full items-center">
          <input
            className="hkek-input-text w-full bg-transparent text-black-01 outline-none focus-visible:outline-none"
            type="text"
            value={`${data?.url}`}
          />
        </div>
      </div>
      <Typography
        variant="paragraph"
        className="text-gray-01"
      >
        copy and share the link above
      </Typography>
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default InvitationsPage;
