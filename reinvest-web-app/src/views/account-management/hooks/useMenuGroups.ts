import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { MENU_GROUPS } from '../constants';
import { MenuGroup } from '../interfaces';

interface Returns {
  menuGroups: MenuGroup[];
}

export function useMenuGroups(): Returns {
  const { activeAccount } = useActiveAccount();

  const sectionInvestingByAccountType = useMemo(() => {
    const isBeneficiaryAccount = activeAccount?.type === AccountType.Beneficiary;

    return isBeneficiaryAccount ? MENU_GROUPS.investingBeneficiary : MENU_GROUPS.investing;
  }, [activeAccount?.type]);

  const sectionProfileByAccountType = useMemo(() => {
    const isBeneficiaryAccount = activeAccount?.type === AccountType.Beneficiary;

    if (isBeneficiaryAccount) {
      return MENU_GROUPS.beneficiaryProfile;
    }

    const isIndividualAccount = activeAccount?.type === AccountType.Individual;

    return isIndividualAccount ? MENU_GROUPS.individualProfile : MENU_GROUPS.companyProfile;
  }, [activeAccount?.type]);

  const menuGroups = useMemo(
    () => [sectionInvestingByAccountType, MENU_GROUPS.security, sectionProfileByAccountType],
    [sectionInvestingByAccountType, sectionProfileByAccountType],
  );

  return { menuGroups };
}
