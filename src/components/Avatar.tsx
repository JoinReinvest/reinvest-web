import { Avatar as BaseAvatar, AvatarProps as BaseAvatarProps } from '@hookooekoo/ui-avatar';
import cx from 'classnames';
import Image, { ImageProps } from 'next/image';

export interface AvatarProps extends Pick<BaseAvatarProps, 'altText'> {
  src: ImageProps['src'];
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = ({ src, size = 'lg', altText }: AvatarProps) => {
  const styles = cx({
    relative: true,
    'w-28 h-28': size === 'sm',
    'w-[44px] h-[44px]': size === 'md',
    'w-[72px] h-[72px]': size === 'lg',
    'w-[100px] h-[100px]': size === 'xl',
  });

  return (
    <BaseAvatar
      className={styles}
      altText={altText}
      rounded
      image={
        <Image
          className="rounded-full"
          src={src}
          alt={altText}
          layout="fill"
        />
      }
    />
  );
};
