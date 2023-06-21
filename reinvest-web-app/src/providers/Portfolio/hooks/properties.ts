import { useMemo } from 'react';
import { Maybe, PortfolioDetails, Property } from 'reinvest-app-common/src/types/graphql';

interface Params {
  portfolio: PortfolioDetails | null;
}

interface Returns {
  getProperty: (propertyIndex: number) => Property | null;
  properties: Maybe<Property>[];
}

export function useProperties({ portfolio }: Params): Returns {
  const properties = useMemo(() => portfolio?.properties ?? [], [portfolio]);

  function getProperty(propertyIndex: number) {
    return properties.at(propertyIndex) ?? null;
  }

  return { properties, getProperty };
}
