import { RefObject, useEffect } from 'react';

interface Params {
  areThereMoreNotificationsToFetch: boolean;
  fetchMoreNotifications: () => void;
  isLastItem: boolean;
  ref: RefObject<HTMLLIElement>;
}

export function useNotificationItemObserver({ ref, isLastItem, fetchMoreNotifications, areThereMoreNotificationsToFetch }: Params) {
  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLastItem && entry?.isIntersecting) {
        if (areThereMoreNotificationsToFetch) {
          fetchMoreNotifications();
        }

        observer.unobserve(entry.target);
      }
    });

    observer.observe(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastItem]);
}
