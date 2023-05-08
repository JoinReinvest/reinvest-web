import cx from 'classnames';
import { ButtonLink } from 'components/ButtonLink';
import { Checkbox } from 'components/FormElements/Checkbox';
import { Typography } from 'components/Typography';
import { ComponentProps, PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';

type PrimitiveProps<FormFields extends FieldValues> = ComponentProps<typeof Checkbox<FormFields>>;

interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields>, PropsWithChildren {
  labelAsButtonLink?: boolean;
  onButtonLinkClick?: () => void;
}

export function CheckboxLabeled<FormFields extends FieldValues>({ labelAsButtonLink = false, onButtonLinkClick, children, ...props }: Props<FormFields>) {
  const className = cx('checkbox-labeled flex gap-16 first:flex-none', { 'items-start': !labelAsButtonLink, 'items-center': labelAsButtonLink });

  return (
    <label className={className}>
      <div className="p-6">
        <Checkbox
          {...props}
          shouldUnregister
        />
      </div>

      {labelAsButtonLink && typeof children === 'string' ? (
        <ButtonLink
          label={children}
          onClick={onButtonLinkClick}
        />
      ) : (
        <Typography
          className="contents"
          variant="paragraph-large"
        >
          {children}
        </Typography>
      )}
    </label>
  );
}
