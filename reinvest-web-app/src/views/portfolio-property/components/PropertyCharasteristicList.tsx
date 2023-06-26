import { Separator } from '@radix-ui/react-separator';
import { Typography } from 'components/Typography';
import Image from 'next/image';
import { Maybe, Poi } from 'reinvest-app-common/src/types/graphql';

interface Props {
  items: Maybe<Poi>[];
}

export const PropertyCharacteristicList = ({ items }: Props) => {
  return (
    <ul className="flex w-full max-w-full flex-col gap-32 border border-gray-04 px-24 py-16 md:max-w-max md:flex-row">
      {items.map((item, index) => (
        <>
          <li className="flex gap-12">
            {item?.image && (
              <div className="relative h-52 w-52">
                <Image
                  src={item.image}
                  alt={item?.name ?? ''}
                  fill
                />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Typography variant="h6">{item?.name}</Typography>

              <Typography
                variant="paragraph-emphasized-regular"
                className="text-gray-01"
              >
                {item?.description}
              </Typography>
            </div>
          </li>

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
