import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Typography } from 'components/Typography';
import { Maybe, PropertyAddress } from 'reinvest-app-common/src/types/graphql';

interface Props {
  address?: Maybe<PropertyAddress>;
}

export function PropertyAddress({ address }: Props) {
  const addressTitle = address?.addressLine;
  const addressSubtitle = [address?.city, address?.zip].filter(Boolean).join(', ');

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <Typography variant="bonus-heading">{addressTitle}</Typography>
        <Typography
          variant="paragraph-small"
          className="text-gray-02"
        >
          {addressSubtitle}
        </Typography>
      </div>

      <IconArrowRight className="text-gray-02" />
    </div>
  );
}
