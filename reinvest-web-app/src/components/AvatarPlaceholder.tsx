import cx from 'classnames';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  accountType: DraftAccountType;
  className?: string;
}

const getTextToDisplay = (accountType: DraftAccountType) => {
  if (accountType === DraftAccountType.Trust) {
    return 'T';
  }

  return 'C';
};

export const AvatarPlaceholder = ({ accountType, className = '' }: Props) => {
  const styles = cx({
    'bg-gold': accountType === DraftAccountType.Corporate,
    'bg-gray-03': accountType === DraftAccountType.Trust,
    'rounded-full flex justify-center items-center': true,
    [className]: true,
  });

  return <div className={styles}>{getTextToDisplay(accountType)}</div>;
};
