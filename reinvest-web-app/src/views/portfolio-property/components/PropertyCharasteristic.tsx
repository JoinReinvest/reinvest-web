import { Typography } from 'components/Typography';
import { PropertyDetails } from 'types/portfolio-property';

import { PROPERTY_CHARASTERISTIC_ICONS } from '../constants/property-charasteristics';

interface Props {
  item: PropertyDetails['characteristics'][0];
}

export const PropertyCharasteristic = ({ item }: Props) => {
  const characteristicIcon = PROPERTY_CHARASTERISTIC_ICONS.get(item.type);

  return (
    <li className="flex gap-12">
      {characteristicIcon?.icon}

      <div className="flex flex-col gap-4">
        <Typography variant="h6">{item.info}</Typography>

        <Typography
          variant="paragraph-emphasized-regular"
          className="text-gray-01"
        >
          {item.value}
        </Typography>
      </div>
    </li>
  );
};
