import { NextPage } from 'next';

import { CircleSuccess } from '../../components/CircleSuccess';
import { Title } from '../../components/Title';

const ConfirmationPage: NextPage = () => {
  return (
    <>
      <CircleSuccess />

      <Title title="Your password has successfully been reset." />
    </>
  );
};

export default ConfirmationPage;
