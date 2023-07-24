import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  userProfile: null,
  userProfileMeta: DEFAULT_QUERY_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUserProfile: () => new Promise(() => {}),
  updateUserProfileMeta: DEFAULT_MUTATION_META,
});
