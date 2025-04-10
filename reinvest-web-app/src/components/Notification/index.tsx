import { Collapsible } from '@hookooekoo/ui-collapsible';

import { NotificationProps } from './interfaces';
import { NotificationButton } from './NotificationButton';
import { NotificationHeader } from './NotificationHeader';

export const Notification = ({ isOpen, title, children, actions }: NotificationProps) => (
  <Collapsible
    isOpen={isOpen}
    header={state => (
      <NotificationHeader
        isOpen={state}
        title={title}
      />
    )}
    className='select-none" max-w-375 cursor-pointer'
  >
    <div className="flex flex-col gap-y-8 bg-green-frost-01/[0.4] px-24 py-16">
      <div>{children}</div>

      <footer className="flex justify-between gap-x-12">
        {actions.map(action => (
          <NotificationButton
            key={action.label}
            {...action}
          />
        ))}
      </footer>
    </div>
  </Collapsible>
);
