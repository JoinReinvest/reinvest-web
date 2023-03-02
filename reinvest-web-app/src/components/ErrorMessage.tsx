import { Typography } from './Typography';

interface ErrorMessageProps {
  message: string;
}
export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Typography
    variant="paragraph-large"
    className="mb-12 text-tertiary-error"
  >
    {message}
  </Typography>
);
