import { Typography } from 'components/Typography';
import Image from 'next/image';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';
import { PropertyDetails } from 'types/portfolio-property';

interface Props {
  date: PropertyDetails['updates'][0]['date'];
  updateContent: PropertyDetails['updates'][0]['content'];
}

export const ColumnContent = ({ date, updateContent }: Props) => {
  const dateLabel = formatDate(date, 'PROPERTY_UPDATE', { currentFormat: 'API' });

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <Typography variant="bonus-heading">{updateContent.info}</Typography>

        <Typography
          variant="paragraph-small"
          className="text-gray-02"
        >
          {dateLabel}
        </Typography>
      </div>

      {updateContent.image && (
        <div
          role="figure"
          className="relative min-h-170 overflow-hidden"
        >
          <Image
            className="max-w-255 rounded-5 object-center"
            src={updateContent.image}
            alt={`Update from ${dateLabel}`}
            fill
          />
        </div>
      )}
    </div>
  );
};
