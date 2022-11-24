import { AvatarProps as Props } from '@hookooekoo/ui-avatar';
import { VariantProps } from 'class-variance-authority';
import { ImageProps } from 'next/image';

import { variants } from './variants';

export interface AvatarProps extends PrimitiveProps, VariantsProps {
  src: ImageProps['src'];
}

type PrimitiveProps = Pick<Props, 'altText'>;
type VariantsProps = VariantProps<typeof variants>;
