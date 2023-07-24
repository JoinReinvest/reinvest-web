import { CheckItem } from './CheckItem';

interface Props {
  checks: [string, boolean][];
  blackColorText?: boolean;
}

const generateCheckListItem = (label: string, state: boolean, blackColorText?: boolean) => (
  <CheckItem
    isChecked={state}
    blackColorText={blackColorText}
  >
    {label}{' '}
  </CheckItem>
);

export const Checklist = ({ checks, blackColorText = false }: Props) => (
  <ul className="flex flex-col gap-8">{checks.map(([label, isChecked]) => generateCheckListItem(label, isChecked, blackColorText))}</ul>
);
