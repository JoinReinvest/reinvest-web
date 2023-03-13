import { LogoIcon } from 'assets/LogoIcon';
import React from 'react';

export interface LoginLayoutProps {
  children?: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="flex h-screen flex-col items-center justify-around gap-40 text-center text-white md:justify-center md:gap-84">
      <video
        autoPlay
        loop
        muted
        className="absolute h-screen w-screen object-cover"
      >
        <source
          src={require('../assets/videos/login-background.mp4')}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <LogoIcon className="z-30 mt-60 h-144 w-144 fill-green-frost-01 md:mt-0 md:h-96 md:w-96" />

      {children}
    </div>
  );
};
