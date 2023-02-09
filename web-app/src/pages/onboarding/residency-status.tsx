import { IconWarning } from 'assets/icons/IconWarning';
import { BlackModal } from 'components/BlackModal';
import { CitizenOptions } from 'components/CitizenOptions';
import { CitizenOption } from 'components/CitizenOptions/interfaces';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

const citizens: CitizenOption[] = [
  {
    value: 'us',
    title: 'US Citizen',
  },
  {
    value: 'green-card',
    title: 'Green Card',
  },
  {
    value: 'visa',
    title: 'Visa',
  },
];

const ResidencyStatusPage: NextPage = () => {
  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log(1); // eslint-disable-line
        }}
      >
        <Title
          title="Residency Status"
          subtitle="Please select your US residency status."
        />
        <div className="text-green-frost-01 my-16 flex items-center gap-8">
          <IconWarning />
          <Typography variant="paragraph-small">REINVEST does not accept non-US residents at this time.</Typography>
        </div>
        <CitizenOptions options={citizens} />
      </BlackModal>
    </MainLayout>
  );
};

export default ResidencyStatusPage;
