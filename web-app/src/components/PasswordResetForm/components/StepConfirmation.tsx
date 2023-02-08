import { Button } from 'components/Button';
import { CircleSuccess } from 'components/CircleSuccess';
import { Typography } from 'components/Typography';

export const StepConfirmation = () => (
  <div className="flex h-full flex-col gap-24 max-md:justify-between">
    <div className="flex flex-col items-center gap-16 max-md:grow max-md:justify-center">
      <CircleSuccess />

      <Typography
        variant="heading-5"
        className="text-center"
      >
        Your password has successfully been reset.{' '}
      </Typography>
    </div>

    <Button
      type="button"
      label="Continue"
    />
  </div>
);
