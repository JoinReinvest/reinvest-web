import { LogoIcon } from 'assets/LogoIcon';
import LoginBackground from 'assets/videos/login-background.mp4';
import React from 'react';

export interface LoginLayoutProps {
  children?: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="gap-84 flex h-screen flex-col items-center justify-center text-center text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute h-screen w-screen object-cover"
      >
        <source
          src={LoginBackground}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <LogoIcon className="z-30" />
      {children}
    </div>
  );
};
