import cx from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PrimitiveProps = Pick<HTMLAttributes<HTMLFormElement>, 'className' | 'onSubmit'>;
interface FormProps extends PrimitiveProps, PropsWithChildren {
  expandsOnLargerScreen?: boolean;
  isCentered?: boolean;
}

export const Form = ({ onSubmit, children, className, expandsOnLargerScreen = false, isCentered = true }: FormProps) => {
  const styles = cx(
    'relative flex h-full flex-col md:justify-center max-w-330',
    { 'lg:max-w-1044 items-center': expandsOnLargerScreen, 'mx-auto': isCentered },
    className,
  );

  return (
    <form
      onSubmit={onSubmit}
      className={styles}
    >
      {children}
    </form>
  );
};
