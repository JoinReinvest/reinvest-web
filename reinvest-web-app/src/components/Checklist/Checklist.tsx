import { CheckItem } from './CheckItem';

interface Props {
  checks: [string, boolean][];
}

const generateCheckListItem = (label: string, state: boolean) => <CheckItem isChecked={state}>{label}</CheckItem>;

export const Checklist = ({ checks }: Props) => (
  <ul className="flex flex-col gap-8">{checks.map(([label, isChecked]) => generateCheckListItem(label, isChecked))}</ul>
);
