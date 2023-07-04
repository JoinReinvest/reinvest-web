import { IconSpinner } from 'assets/icons/IconSpinner';
import { useUserProfile } from 'providers/UserProfile';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { CompanyTickerSymbol } from 'views/onboarding/form-flow/form-fields';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { userProfile, userProfileMeta } = useUserProfile();

    useEffect(() => {
      async function updateStore() {
        if (userProfileMeta?.isSuccess) {
          const statements = userProfile?.details?.statements ?? [];

          const companyStatement = statements?.find(statement => statement?.type === StatementType.TradingCompanyStakeholder);
          const companyStatementDetails = (companyStatement?.details ?? []) as string[];
          const companyTickerSymbols: CompanyTickerSymbol[] = companyStatementDetails.map(symbol => ({ symbol }));

          const finraStatement = statements?.find(statement => statement?.type === StatementType.FinraMember);
          const finraInstitutionName = finraStatement?.details?.join(', ') ?? '';

          const politicalFigureStatement = statements?.find(statement => statement?.type === StatementType.Politician);
          const seniorPoliticalFigure = politicalFigureStatement?.details?.join(', ') ?? '';

          const isAssociatedWithFinra = !!finraStatement;
          const isSeniorPoliticalFigure = !!politicalFigureStatement;
          const isAssociatedWithPubliclyTradedCompany = !!companyStatement;
          const doNoneApply = !isAssociatedWithFinra && !isSeniorPoliticalFigure && !isAssociatedWithPubliclyTradedCompany;

          await updateStoreFields({
            compliances: {
              isAssociatedWithFinra,
              isSeniorPoliticalFigure,
              isAssociatedWithPubliclyTradedCompany,
              doNoneApply,
            },
            companyTickerSymbols,
            finraInstitutionName,
            seniorPoliticalFigure,
          });

          moveToNextStep();
        }
      }

      updateStore();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfileMeta.isSuccess, userProfile]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
