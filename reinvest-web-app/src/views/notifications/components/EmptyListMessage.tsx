import { IconInformation } from 'assets/icons/IconInformation';
import { Typography } from 'components/Typography';

const MESSAGE = 'No Notifications';

export const EmptyListMessage = () => (
  <div
    role="alert"
    className="flex items-center gap-10 pt-24"
  >
    <IconInformation />
    <Typography variant="h6">{MESSAGE}</Typography>
  </div>
);
