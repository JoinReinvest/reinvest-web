import { Avatar as PrimitiveAvatar } from '@hookooekoo/ui-avatar';
import cx from 'classnames';
import Image, { ImageProps } from 'next/image';

type PrimitiveProps = Pick<ImageProps, 'src' | 'alt'>;
interface Props extends PrimitiveProps {
  fixedSize?: 'xs' | 'sm' | 'md' | 'lg';
  isSizeFixed?: boolean;
}

export const Avatar = ({ src, alt, isSizeFixed = false, fixedSize = 'lg' }: Props) => {
  const className = cx('relative', {
    'h-28 w-28 lg:h-44 lg:w-44': !isSizeFixed,
    'h-72 w-72': isSizeFixed && fixedSize === 'lg',
    'h-60 w-60': isSizeFixed && fixedSize === 'md',
    'h-44 w-44': isSizeFixed && fixedSize === 'sm',
    'h-28 w-28': isSizeFixed && fixedSize === 'xs',
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
