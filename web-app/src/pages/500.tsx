import { ErrorWrapper } from 'components/ErrorWrapper';
import { Typography } from 'components/Typography';

const index = () => {
  return (
    <ErrorWrapper>
      <Typography
        variant="h1"
        className="text-center"
      >
        500
        <span className="mx-20">|</span>
        Internal Server Error
      </Typography>
    </ErrorWrapper>
  );
};

export default index;
