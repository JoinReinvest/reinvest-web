import { LogoIcon } from 'assets/LogoIcon';
import React from 'react';

export interface LoginLayoutProps {
  children?: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-between max-lg:pb-44 gap-40 text-center text-white lg:justify-center lg:gap-84">
      <div className="absolute after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-b after:from-black-01/10 after:to-black-01/50">
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

      <LogoIcon className="z-30 mt-[80px] h-144 w-144 fill-green-frost-01 lg:mt-0 lg:h-96 lg:w-96" />

      {children}
    </div>
  );
};
