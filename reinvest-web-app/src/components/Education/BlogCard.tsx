import Image from 'next/image';

import { Link } from '../Link';
import { Typography } from '../Typography';

export interface BlogPostInterface {
  data: string;
  slug: string;
  title: string;
  image?: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
}

export const BlogCard = ({ slug, title, data, image }: BlogPostInterface) => {
  return (
    <Link
      title={title}
      href={`/education/blog/${slug}`}
      className="text-link font-stretch-expanded"
    >
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-120 w-full object-cover lg:h-210"
        />
      )}
      <div className="border-x border-b border-gray-04 py-12 px-16">
        <Typography
          variant="h6"
          className="hover:underline"
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          className="text-gray-02"
        >
          {data}
        </Typography>
      </div>
    </Link>
  );
};
