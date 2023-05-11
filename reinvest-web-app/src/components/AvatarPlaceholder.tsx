import cx from 'classnames';
import { AccountType, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  accountType: DraftAccountType | AccountType | string;
  className?: string;
  label?: string;
}

export const AvatarPlaceholder = ({ accountType, className = '', label }: Props) => {
  const styles = cx({
    'bg-gold': accountType === DraftAccountType.Corporate,
    'bg-gray-03': accountType === DraftAccountType.Trust,
    'rounded-full flex justify-center items-center': true,
    [className]: true,
  });

  return <div className={styles}>{label}</div>;
};
