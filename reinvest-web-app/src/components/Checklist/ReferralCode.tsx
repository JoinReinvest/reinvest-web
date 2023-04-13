import { useMemo } from 'react';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';

import { Checklist } from './Checklist';

interface Props {
  referralCode: string;
}

const schema = formValidationRules.referralCode;

export const ReferralCodeChecklist = ({ referralCode }: Props) => {
  const isCodeValid = schema.safeParse(referralCode).success;

  const checks = useMemo<[string, boolean][]>(
    () => [
      ['Valid Code', isCodeValid],
      ['Invalid Code', !isCodeValid],
    ],
    [isCodeValid],
  );

  return <Checklist checks={checks} />;
};
