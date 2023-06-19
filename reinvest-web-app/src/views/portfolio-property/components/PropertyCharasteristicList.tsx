import { Separator } from '@radix-ui/react-separator';
import { PropertyDetails } from 'types/portfolio-property';

import { PropertyCharasteristic } from './PropertyCharasteristic';

interface Props {
  items: PropertyDetails['characteristics'];
}

export const PropertyCharacteristicList = ({ items }: Props) => {
  return (
    <ul className="flex w-full max-w-full flex-col gap-32 border border-gray-04 px-24 py-16 md:max-w-max md:flex-row">
      {items.map((item, index) => (
        <>
          <PropertyCharasteristic
            key={index}
            item={item}
          />

          {index !== items.length - 1 && (
            <Separator
              decorative
              className="min-h-1 w-full bg-gray-04 md:min-h-full md:w-1"
            />
          )}
        </>
      ))}
    </ul>
  );
};
