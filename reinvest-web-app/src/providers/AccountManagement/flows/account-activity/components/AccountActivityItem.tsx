import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { useRef } from 'react';
import { AccountActivity, Maybe } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

interface Props {
  activity: Maybe<AccountActivity>;
  fetchMoreItems: () => void;
  isLastItem: boolean;
  onClick: (activity: Maybe<AccountActivity>) => Promise<void>;
}

export function AccountActivityItem({ activity, isLastItem, onClick }: Props) {
  const ref = useRef<HTMLLIElement>(null);

  const date = formatDate(activity?.date, 'ACCOUNT_ACTIVITY', { currentFormat: 'API' });

  return (
    <>
      <li
        ref={ref}
        className="w-full"
      >
        <button
          className="flex w-full items-center justify-between"
          onClick={() => onClick(activity)}
        >
          <div className="flex flex-col text-left">
            <Typography variant="bonus-heading-regular">{activity?.activityName}</Typography>
            <Typography variant="paragraph">{date}</Typography>
          </div>

          <div className="flex items-center">
            <IconArrowRight />
          </div>
        </button>
      </li>

      {!isLastItem && <Separator />}
    </>
  );
}
