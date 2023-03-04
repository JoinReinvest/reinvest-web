import { Avatar as PrimitiveAvatar } from '@hookooekoo/ui-avatar';
import Image, { ImageProps } from 'next/image';

type Props = PrimitiveProps;

type PrimitiveProps = Pick<ImageProps, 'src' | 'alt'>;

export const Avatar = ({ src, alt }: Props) => (
  <PrimitiveAvatar
    className="h-28 w-28 lg:h-44 lg:w-44"
    image={
      <Image
        className="rounded-full"
        src={src}
        alt={alt}
      />
    }
  />
);
