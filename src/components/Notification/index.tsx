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
    className='max-w-[375px] cursor-pointer select-none"'
  >
    <div className="py-16 px-24 flex flex-col gap-y-8 bg-green-frost-solid/[0.4]">
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
