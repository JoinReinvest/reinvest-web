import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

import { getLabelToDisplay } from './InputAvatar';

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  options: Maybe<AccountOverview>[];
}

export function AccountSelection<FormFields extends FieldValues>({ options, ...controllerProps }: Props<FormFields>) {
  return (
    <RadioGroup
      className="flex flex-col gap-16"
      {...controllerProps}
      loopNavigation
      orientation="vertical"
      readingDirection="ltr"
    >
      {options.map(account => (
        <RadioGroupItem
          key={account?.id}
          value={account?.id || ''}
          className="group flex items-center"
        >
          <div className="flex grow items-center gap-16">
            <Avatar
              isSizeFixed
              fixedSize="md"
              accountType={account?.type || 'INDIVIDUAL'}
              alt={`${account?.label}'s profile picture`}
              label={getLabelToDisplay(account?.type || '')}
            />

            <div>
              <Typography
                variant="h6"
                className="text-left"
              >
                {account?.label}
              </Typography>

              <Typography
                variant="h6-responsive"
                className="capitalize"
              >
                {account?.type?.toLowerCase()} Account
              </Typography>
            </div>
          </div>

          <AccountSelectionIndicator />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}

function AccountSelectionIndicator() {
  return (
    <div className="flex h-24 w-24 items-center rounded-full p-2 group-data-[state='unchecked']:border group-data-[state='unchecked']:border-gray-03 group-data-[state='checked']:bg-gray-03">
      <IconCheckmark className="max-h-full max-w-full group-data-[state='unchecked']:opacity-0" />
    </div>
  );
}
