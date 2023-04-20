import { Avatar as PrimitiveAvatar } from '@hookooekoo/ui-avatar';
import cx from 'classnames';
import Image, { ImageProps } from 'next/image';

type PrimitiveProps = Pick<ImageProps, 'src' | 'alt'>;
interface Props extends PrimitiveProps {
  fixedSize?: 'sm' | 'md' | 'lg';
  isSizeFixed?: boolean;
}

export const Avatar = ({ src, alt, isSizeFixed = false, fixedSize = 'lg' }: Props) => {
  const className = cx('relative', {
    'h-28 w-28 lg:h-44 lg:w-44': !isSizeFixed,
    'h-100 w-100': isSizeFixed && fixedSize === 'lg',
    'h-72 w-72': isSizeFixed && fixedSize === 'md',
    'h-44 w-44': isSizeFixed && fixedSize === 'sm',
  });

  return (
    <PrimitiveAvatar
      className={className}
      altText={alt}
      image={
        <Image
          className="rounded-full"
          src={src}
          alt={alt}
          fill
        />
      }
    />
  );
};
