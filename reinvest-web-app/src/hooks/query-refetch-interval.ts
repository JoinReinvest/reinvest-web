import { DEFAULT_QUERY_REFETCH_INTERVAL } from 'constants/queries';
import { useModalCheck } from 'providers/ModalCheck';
import { useCallback } from 'react';

/**
 * To disable interval refetching when a modal is open, in
 * order to avoid unnecessary network requests.
 */
export function useQueryRefetchInterval() {
  const { hasModalOpen } = useModalCheck();
  const refetchInterval = useCallback(() => (hasModalOpen ? false : DEFAULT_QUERY_REFETCH_INTERVAL), [hasModalOpen]);

  return { refetchInterval };
}
