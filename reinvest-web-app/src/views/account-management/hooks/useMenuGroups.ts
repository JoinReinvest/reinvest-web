import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useMemo } from 'react';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { QueryMeta } from 'types/queries';

import { MENU_GROUPS } from '../constants/menu';
import { FlowIdentifiers } from '../enums/flow';
import { MenuGroup } from '../interfaces/menu';

interface Returns {
  menuGroups: MenuGroup[];
  meta: QueryMeta;
}

export function useMenuGroups(): Returns {
  const { activeAccount } = useActiveAccount();
  const { activeRecurringInvestment, activeRecurringInvestmentMeta } = useRecurringInvestment();

  const sectionInvestingByAccountType = useMemo(() => {
    const isBeneficiaryAccount = activeAccount?.type === AccountType.Beneficiary;

    return isBeneficiaryAccount ? MENU_GROUPS.investingBeneficiary : MENU_GROUPS.investing;
  }, [activeAccount?.type]);

  const menuGroups = useMemo(() => {
    if (activeRecurringInvestmentMeta.isSuccess) {
      const filteredSectionInvestingItems = sectionInvestingByAccountType.items.filter(({ identifier }) => {
        if (identifier === FlowIdentifiers.RECURRING_INVESTMENTS) {
          return !!activeRecurringInvestment;
        }

        return true;
      });

      return [{ ...sectionInvestingByAccountType, items: filteredSectionInvestingItems }, MENU_GROUPS.security, MENU_GROUPS.profile];
    }

    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionInvestingByAccountType, activeRecurringInvestment, activeRecurringInvestmentMeta.isSuccess]);

  // Merge meta with other queries if necessary
  return { menuGroups, meta: activeRecurringInvestmentMeta };
}
