import cx from 'classnames';
import { AccountType, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  accountType: DraftAccountType | AccountType | 'draft-beneficiary';
  className?: string;
  label?: string;
}

export const AvatarPlaceholder = ({ accountType, className = '', label }: Props) => {
  const styles = cx({
    'bg-gray-03': accountType === DraftAccountType.Corporate,
    'bg-gold': accountType === DraftAccountType.Trust,
    'bg-green-deep text-white': accountType === DraftAccountType.Individual,
    'bg-green-frost-01': accountType === AccountType.Beneficiary,
    'bg-tertiary-warning text-white': accountType === 'draft-beneficiary',
    'rounded-full flex justify-center items-center': true,
    [className]: true,
  });

  return <div className={styles}>{label}</div>;
};
