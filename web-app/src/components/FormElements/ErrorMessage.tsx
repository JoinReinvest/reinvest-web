import { Typography } from '../Typography';

interface ErrorMessageProps {
  message: string;
}
export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Typography
    variant="paragraph-small"
    className="text-tertiary-error"
  >
    {message}
  </Typography>
);
