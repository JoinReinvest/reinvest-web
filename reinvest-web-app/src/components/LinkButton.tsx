import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
  label: string;
}

export const LinkButton = ({ label, href, ...props }: Props) => {
  return (
    <Link
      href={href}
      title={label}
      className="typo-button h-48 w-full bg-green-frost-01 py-15 px-30 text-center text-green-deep"
      {...props}
    >
      {label}
    </Link>
  );
};
