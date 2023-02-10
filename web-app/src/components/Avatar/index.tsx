import { Avatar as PrimitiveAvatar } from '@hookooekoo/ui-avatar';
import Image from 'next/image';

import { AvatarProps } from './interfaces';
import { variants } from './variants';

export const Avatar = ({ src, size = 'lg', altText, className }: AvatarProps) => {
  const styles = variants({ size, className });

  return (
    <PrimitiveAvatar
      className={styles}
      altText={altText}
      rounded
      image={
        <Image
          className="rounded-full"
          src={src}
          alt={altText || ''}
          layout="fill"
          priority
        />
      }
    />
  );
};
