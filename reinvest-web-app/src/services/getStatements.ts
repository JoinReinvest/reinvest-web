import { AccreditedInvestorStatement, StatementType } from 'reinvest-app-common/src/types/graphql';

export const getStatements = (statementTypes: StatementType[], finraInstitutionName?: string, isAccreditedInvestor?: boolean) => {
  const statements = [];

  statementTypes?.includes(StatementType.FinraMember) && finraInstitutionName
    ? statements.push({ type: StatementType.FinraMember, forFINRA: { name: finraInstitutionName } })
    : undefined;

  statements.push({
    type: StatementType.AccreditedInvestor,
    forAccreditedInvestor: {
      statement: isAccreditedInvestor
        ? AccreditedInvestorStatement.IAmAnAccreditedInvestor
        : AccreditedInvestorStatement.IAmNotExceeding_10PercentOfMyNetWorthOrAnnualIncome,
    },
  });

  return statements;
};
