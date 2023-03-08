import { Typography } from 'components/Typography';
import Image from 'next/image';

export interface BlogCardProps {
  title: string
  data: string
  slug: string
  image: {
    width: number
    height: number
    src: string
    alt: string
    name: string
  }
}

export const BlogCard = ({ image, title, data }: BlogCardProps) => (
  <div>
    <Image
      src={image.src}
      alt={title}
      width={image.width}
      height={image.height}
    />
    <div className="border-gray-04 border-x border-b py-12 px-16">
      <Typography variant="bonus-heading">{title}</Typography>
      <Typography
        variant="paragraph"
        className="text-gray-02"
      >
        {data}
      </Typography>
    </div>
  </div>
);
