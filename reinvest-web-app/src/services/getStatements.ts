import { AccreditedInvestorStatement, StatementInput, StatementType } from 'reinvest-app-common/src/types/graphql';

export const getStatements = (statementTypes: StatementType[], finraInstitutionName?: string, isAccreditedInvestor?: boolean) => {
  const statements: StatementInput[] = [
    {
      type: StatementType.AccreditedInvestor,
      forAccreditedInvestor: {
        statement: isAccreditedInvestor
          ? AccreditedInvestorStatement.IAmAnAccreditedInvestor
          : AccreditedInvestorStatement.IAmNotExceeding_10PercentOfMyNetWorthOrAnnualIncome,
      },
    },
  ];

  if (statementTypes?.includes(StatementType.FinraMember) && finraInstitutionName) {
    statements.push({ type: StatementType.FinraMember, forFINRA: { name: finraInstitutionName } });
  }

  return statements;
};
