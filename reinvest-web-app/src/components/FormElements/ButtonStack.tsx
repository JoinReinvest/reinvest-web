import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export const ButtonStack = ({ children }: Props) => <div className="absolute w-full bottom-0 flex flex-col gap-16">{children}</div>;
