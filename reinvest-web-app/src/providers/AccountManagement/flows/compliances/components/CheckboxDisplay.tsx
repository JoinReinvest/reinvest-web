import { Indicator, Root } from '@radix-ui/react-checkbox';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isChecked?: boolean;
}

/**
 * For displaying compliance statements in a static checkbox.
 */
export function CheckboxDisplay({ isChecked, children }: Props) {
  const className = cx('checkbox-labeled flex gap-16 first:flex-none items-start');

  return (
    <label className={className}>
      <div className="p-6">
        <Root
          className="hkek-checkbox grid place-items-center"
          checked={isChecked}
          disabled
        >
          <Indicator>
            <IconCheckmark className="h-20 w-20" />
          </Indicator>
        </Root>
      </div>

      <Typography
        className="contents"
        variant="h6"
      >
        {children}
      </Typography>
    </label>
  );
}
