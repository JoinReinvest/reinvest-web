import { useRef } from 'react';

export function useStaticState<State>(state: State): [State, (state: State) => void] {
  const ref = useRef<State>(state);

  const setRef = (state: State) => {
    ref.current = state;
  };

  return [ref.current, setRef];
}
