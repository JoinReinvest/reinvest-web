import { useState } from 'react';

export const useToggler = (initialState = false): [boolean, (state?: boolean) => void] => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = (state?: boolean) => {
    if (state !== undefined) {
      return setIsToggled(state);
    } else {
      return setIsToggled(!isToggled);
    }
  };

  return [isToggled, toggle];
};
