import { IconSpinner } from 'assets/icons/IconSpinner';
import { useUserProfile } from 'providers/UserProfile';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { UpdateProfileInput } from 'reinvest-app-common/src/types/graphql';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepUpdate: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.UPDATE,

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { updateUserProfile, updateUserProfileMeta } = useUserProfile();

    useEffect(() => {
      async function updateStore() {
        const { compliances } = storeFields;
        const statements: UpdateProfileInput['statements'] = [];
        const removeStatements: UpdateProfileInput['removeStatements'] = [];

        if (!!compliances?.isAssociatedWithFinra && !!storeFields?.finraInstitutionName) {
          statements.push({ type: StatementType.FinraMember, forFINRA: { name: storeFields.finraInstitutionName } });
        } else {
          removeStatements.push({ type: StatementType.FinraMember });
        }

        if (!!compliances?.isSeniorPoliticalFigure && !!storeFields?.seniorPoliticalFigure) {
          statements.push({ type: StatementType.Politician, forPolitician: { description: storeFields.seniorPoliticalFigure } });
        } else {
          removeStatements.push({ type: StatementType.Politician });
        }

        if (!!compliances?.isAssociatedWithPubliclyTradedCompany && !!storeFields?.companyTickerSymbols?.length) {
          const tickerSymbols = storeFields.companyTickerSymbols.map(({ symbol }) => symbol);
          statements.push({ type: StatementType.TradingCompanyStakeholder, forStakeholder: { tickerSymbols } });
        } else {
          removeStatements.push({ type: StatementType.TradingCompanyStakeholder });
        }

        await updateUserProfile({ statements, removeStatements });
      }

      updateStore();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      async function updateStore() {
        if (updateUserProfileMeta?.isSuccess) {
          await updateStoreFields({ _hasSucceded: true });
          moveToNextStep();
        }
      }

      updateStore();
    }, [updateUserProfileMeta?.isSuccess, updateStoreFields, moveToNextStep]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
