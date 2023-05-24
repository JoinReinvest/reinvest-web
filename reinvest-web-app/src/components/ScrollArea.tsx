import { Typography } from 'components/Typography';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title?: string;
}

export const ScrollArea = ({ title, children }: Props) => {
  return (
    <article className="flex flex-col gap-16 overflow-hidden">
      {title && <Typography variant="paragraph-emphasized">{title}</Typography>}

      <div className="h-full max-h-284 overflow-y-auto border border-gray-03 px-12 py-8 md:max-h-570">
        <Typography variant="paragraph-large">{children}</Typography>
      </div>
    </article>
  );
};
