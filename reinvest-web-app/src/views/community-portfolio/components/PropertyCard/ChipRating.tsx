import { Typography } from 'components/Typography';

interface Props {
  rating: string;
}

const PREFIX = 'Rating';

export function ChipRating({ rating }: Props) {
  const label = [PREFIX, rating].join(' ');

  return (
    <div className="grid place-items-center rounded-48 bg-gradient-to-r from-green-frost-01 to-white px-8 py-2">
      <Typography variant="paragraph-small">{label}</Typography>
    </div>
  );
}
