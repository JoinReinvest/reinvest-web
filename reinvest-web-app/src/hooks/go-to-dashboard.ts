import { URL } from 'constants/urls';
import { useRouter } from 'next/router';

interface Returns {
  maybeGoToDashboard: () => void;
}

/**
 * Useful for form flows outside of the dashboard route that
 * should redirect to the dashboard on their last step. For example,
 * account management flows that can be triggered on the education
 * page.
 */
export function useGoToDashboard(): Returns {
  const router = useRouter();

  async function maybeGoToDashboard() {
    if (router.pathname !== URL.index) {
      router.push(URL.index);
    }
  }

  return { maybeGoToDashboard };
}
