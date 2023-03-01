import { PrimitiveVariantProps, variants } from 'components/Button/variants';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

interface Props extends LinkProps, PrimitiveVariantProps {
  label: string;
}

export const LinkButton = forwardRef<HTMLAnchorElement, Props>(({ label, variant = 'default', size = 'sm', disabled = false, ...props }, ref) => {
  const className = variants({ variant, size, disabled });

  return (
    <Link
      {...props}
      className={className}
      ref={ref}
    >
      {label}
    </Link>
  );
});
