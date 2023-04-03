import { components, InputProps } from 'react-select';

export function Input<Option>(props: InputProps<Option>) {
  return (
    <components.Input
      {...props}
      isHidden={false}
    />
  );
}
