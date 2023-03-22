import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const ButtonStack = ({ children }: Props) => <div className="flex w-full flex-col gap-16">{children}</div>;
