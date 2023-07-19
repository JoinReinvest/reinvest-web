import { Typography } from 'components/Typography';
import Image from 'next/image';
import { Maybe, PortfolioUpdate } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

interface Props {
  update: Maybe<PortfolioUpdate>;
  prioritizeImage?: boolean;
}

export const ColumnContent = ({ update, prioritizeImage }: Props) => {
  const dateLabel = formatDate(update?.createdAt, 'PROPERTY_UPDATE', { currentFormat: 'API_TZ' });

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <Typography variant="bonus-heading">{update?.title}</Typography>

        <Typography
          variant="paragraph-small"
          className="text-gray-02"
        >
          {dateLabel}
        </Typography>
      </div>

      {update?.image && (
        <div
          role="figure"
          className="relative min-h-170 overflow-hidden"
        >
          <Image
            className="max-w-255 rounded-5 object-center"
            src={update?.image.url ?? ''}
            alt={`Update from ${dateLabel}`}
            fill
            priority={prioritizeImage}
          />
        </div>
      )}
    </div>
  );
};
