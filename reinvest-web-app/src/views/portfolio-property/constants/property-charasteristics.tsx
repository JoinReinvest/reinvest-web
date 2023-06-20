import { IconCharasteristicEducation } from 'assets/icons/portfolio-property/IconCharasteristicEducation';
import { IconCharasteristicTransport } from 'assets/icons/portfolio-property/IconCharasteristicTransport';
import { ReactNode } from 'react';
import { PropertyCharacteristicType } from 'types/portfolio-property';

export const PROPERTY_CHARASTERISTIC_ICONS = new Map<PropertyCharacteristicType, { icon: ReactNode }>([
  [PropertyCharacteristicType.education, { icon: <IconCharasteristicEducation /> }],
  [PropertyCharacteristicType.transport, { icon: <IconCharasteristicTransport /> }],
]);
