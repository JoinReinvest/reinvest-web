import { IconSpinner } from 'assets/icons/IconSpinner';
import { useCorporateAccount } from 'hooks/corporate-account';
import { useTrustAccount } from 'hooks/trust-account';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect, useMemo } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType, DocumentFileLinkId } from 'reinvest-app-common/src/types/graphql';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const accountId = activeAccount?.id ?? '';
    const isCorporateAccount = activeAccount?.type === AccountType.Corporate;

    const { corporateAccount } = useCorporateAccount({ accountId, enabled: isCorporateAccount });
    const { trustAccount } = useTrustAccount({ accountId, enabled: !isCorporateAccount });
    const documents = useMemo(
      () => corporateAccount?.details?.companyDocuments ?? trustAccount?.details?.companyDocuments ?? [],
      [corporateAccount, trustAccount],
    );

    useEffect(() => {
      async function updateDocuments() {
        if (documents.length > 0) {
          const nonNullableDocuments = documents.filter(Boolean) as DocumentFileLinkId[];

          await updateStoreFields({ _accountId: accountId, documents: nonNullableDocuments, _isCorporateAccount: isCorporateAccount });
          moveToNextStep();
        }
      }

      updateDocuments();
    }, [documents, updateStoreFields, isCorporateAccount, accountId, moveToNextStep]);

    return (
      <div className="grid h-full place-items-center">
        <IconSpinner />
      </div>
    );
  },
};
