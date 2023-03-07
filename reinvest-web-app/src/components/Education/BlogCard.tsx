import { Typography } from 'components/Typography';
import Image from 'next/image';

export interface BlogCardProps {
  imageSrc: string;
  subtitle: string;
  title: string;
}

export const BlogCard = ({ imageSrc, title, subtitle }: BlogCardProps) => (
  <div>
    <Image
      src={imageSrc}
      alt="education1"
    />
    <div className="border-gray-04 border-x border-b py-12 px-16">
      <Typography variant="bonus-heading">{title}</Typography>
      <Typography
        variant="paragraph"
        className="text-gray-02"
      >
        {subtitle}
      </Typography>
    </div>
  </div>
);
