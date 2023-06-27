import { RefObject, useEffect } from 'react';

interface Params<Element extends HTMLElement> {
  callback: () => void;
  isLastItem: boolean;
  ref: RefObject<Element>;
  willTriggerCallback: boolean;
  onIntersect?: () => void;
}

/**
 * Userful for handling infinite scroll with `useInfiniteQuery`.
 */
export function useItemIntersectionObserver<Element extends HTMLElement>({ ref, isLastItem, callback, willTriggerCallback, onIntersect }: Params<Element>) {
  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && onIntersect) {
        onIntersect();
      }

      if (isLastItem && entry?.isIntersecting) {
        if (willTriggerCallback) {
          callback();
        }

        observer.unobserve(entry.target);
      }
    });

    observer.observe(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastItem]);
}
