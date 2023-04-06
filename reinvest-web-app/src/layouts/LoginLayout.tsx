import { LogoIcon } from 'assets/LogoIcon';
import cx from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PrimitiveProps = Pick<HTMLAttributes<HTMLDivElement>, 'className'>;
interface Props extends PrimitiveProps, PropsWithChildren {}

export const LoginLayout = ({ className, children }: Props) => {
  const classes = cx(
    'relative flex h-screen flex-col items-center justify-between gap-40 text-center text-white max-lg:pb-44 lg:justify-center lg:gap-84',
    className,
  );

  return (
    <div className={classes}>
      <div className="absolute after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-b after:from-black-01/10 after:to-black-01/50">
        <video
          autoPlay
          loop
          muted
          className="h-screen w-screen object-cover"
        >
          <source
            src={require('../assets/videos/login-background.mp4')}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <LogoIcon className="z-30 mt-80 h-144 w-144 fill-green-frost-01 lg:mt-0 lg:h-96 lg:w-96" />

      {children}
    </div>
  );
};
