import { useMemo } from 'react';
import { MAXIMUM_NUMBER_OF_BENEFICIARIES } from 'reinvest-app-common/src/constants/account';
import { AccountOverview, AccountType, Maybe } from 'reinvest-app-common/src/types/graphql';

interface Params {
  allAccounts: Maybe<AccountOverview>[];
}

interface Return {
  isAbleToAddBeneficiaries: boolean;
}

export function useBeneficiaries({ allAccounts }: Params): Return {
  const beneficiaryAccounts = useMemo(() => allAccounts.filter(account => account?.type === AccountType.Beneficiary), [allAccounts]);

  const isAbleToAddBeneficiaries = useMemo(() => {
    const hasIndividualAccount = allAccounts.some(account => account?.type === AccountType.Individual);
    const numberOfBeneficiaries = beneficiaryAccounts.length;

    return hasIndividualAccount && numberOfBeneficiaries < MAXIMUM_NUMBER_OF_BENEFICIARIES;
  }, [beneficiaryAccounts, allAccounts]);

  return { isAbleToAddBeneficiaries };
}
