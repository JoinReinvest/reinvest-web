import { Avatar as PrimitiveAvatar } from '@hookooekoo/ui-avatar';
import cx from 'classnames';
import Image, { ImageProps } from 'next/image';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { AvatarPlaceholder } from './AvatarPlaceholder';

type PrimitiveProps = Pick<ImageProps, 'alt'>;
interface Props extends PrimitiveProps {
  accountType?: DraftAccountType;
  fixedSize?: 'xs' | 'sm' | 'md' | 'lg';
  isSizeFixed?: boolean;
  label?: string;
  src?: string;
}

export const Avatar = ({ src, alt, isSizeFixed = false, fixedSize = 'lg', accountType, label }: Props) => {
  const className = cx('relative', {
    'h-28 w-28 lg:h-44 lg:w-44': !isSizeFixed,
    'h-100 w-100 text-48': isSizeFixed && fixedSize === 'lg',
    'h-72 w-72': isSizeFixed && fixedSize === 'md',
    'h-44 w-44 text-18': isSizeFixed && fixedSize === 'sm',
    'h-28 w-28': isSizeFixed && fixedSize === 'xs',
  });

  return (
    <>
      {src && (
        <PrimitiveAvatar
          className={className}
          image={
            <Image
              className="rounded-full"
              src={src}
              alt={alt}
              fill
            />
          }
        />
      )}
      {!src && accountType && (
        <AvatarPlaceholder
          accountType={accountType}
          className={className}
          label={label}
        />
      )}
    </>
  );
};
