import { BlackModal } from 'components/BlackModal';
import { CodeInput } from 'components/FormElements/CodeInput';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

const CheckPhonePage: NextPage = () => {
  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log(1); // eslint-disable-line
        }}
      >
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />
        <CodeInput
          value={'000-000'}
          onChange={() => {
            console.log(1); // eslint-disable-line
          }}
        />
        <div className="flex justify-between">
          <Link
            href="/"
            title="resend code link"
          >
            Resend Code
          </Link>
          <Link
            href="/"
            title="get help link"
          >
            Get Help
          </Link>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default CheckPhonePage;
