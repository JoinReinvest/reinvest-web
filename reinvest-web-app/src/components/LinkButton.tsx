import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
  label: string;
}

export const LinkButton = ({ label, href, ...props }: Props) => {
  return (
    <Link
      href={href}
      title={label}
      className="typo-button w-full bg-green-frost-01 py-16 text-center text-green-deep"
      {...props}
    >
      {label}
    </Link>
  );
};
