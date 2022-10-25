import { Disclosure } from '@headlessui/react';
import { ButtonProps } from '@hookooekoo/ui-button';
import { IconAlert } from 'assets/icons/IconAlert';

import { NotificationButton } from './NotificationButton';
import { NotificationIcon } from './NotificationIcon';

export interface NotificationProps {
  actions: [NotificationAction, NotificationAction];
  children: JSX.Element;
  title: string;
}

export interface NotificationAction extends Pick<ButtonProps, 'onClick' | 'disabled'> {
  label: string;
}

export const Notification = ({ title, children, actions }: NotificationProps) => (
  <Disclosure>
    {({ open: isExpanded }) => (
      <div className="max-w-[375px] cursor-pointer select-none">
        <Disclosure.Button
          className="py-16 px-24 flex justify-between items-center gap-x-16 bg-green-frost-solid"
          as="div"
        >
          <div className="h-[42px] w-[42px] bg-white flex justify-center items-center rounded-full">
            <IconAlert />
          </div>

          <h4 className="grow text-xl font-extended-regular tracking-tighter">{title}</h4>

          <NotificationIcon isExpanded={isExpanded} />
        </Disclosure.Button>

        <Disclosure.Panel
          className="py-16 px-24 flex flex-col gap-y-8 bg-green-frost-solid/[0.4]"
          as="div"
        >
          <div>{children}</div>

          <footer className="flex justify-between gap-x-12">
            {actions.map(action => (
              <NotificationButton
                key={action.label}
                {...action}
              />
            ))}
          </footer>
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
);
