import { components, SingleValueProps } from 'react-select';

export function SingleValue<Option>(props: SingleValueProps<Option>) {
  const { formatSelectedOptionLabel } = props.selectProps;

  return <components.SingleValue {...props}>{formatSelectedOptionLabel ? formatSelectedOptionLabel(props.data) : props.children}</components.SingleValue>;
}
