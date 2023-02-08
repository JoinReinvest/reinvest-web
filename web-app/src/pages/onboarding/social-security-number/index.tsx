import { InputMasked } from '@hookooekoo/ui-input-masked';
import { BlackModal } from 'components/BlackModal';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useState } from 'react';

const OnboardingSocialSecurityNumberPage: NextPage = () => {
  const [fieldValue, setFieldValue] = useState('');

  return (
    <MainLayout>
      <BlackModal isOpen={true}>
        <div className="flex flex-col gap-36">
          <Typography
            variant="heading-5"
            className="md:text-center"
          >
            What&apos;s your social security number?
          </Typography>

          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <Typography variant="paragraph-emphasized">*REINVEST is required by law to collect your social security number.</Typography>

              <Typography variant="paragraph">
                We take the security of your data very seriously, vestibulum non lacus et eros elementum pellentesque. Duis urna et nunc porta facilisis.
              </Typography>
            </div>

            <form className="flex flex-col gap-16">
              <InputMasked
                name="social-security-number"
                value={fieldValue}
                onChange={value => setFieldValue(value)}
                maskOptions={{ mask: '000-000-000' }}
                placeholder="SSN"
              />

              <Link
                href="/"
                title="why is my social security number required?"
              >
                Required. Why?
              </Link>
            </form>
          </div>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingSocialSecurityNumberPage;
