import * as Sentry from '@sentry/node';
import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error';

import { env } from '../env';

export type ErrorPageProps = {
  err: Error;
  isReadyToRender: boolean;
  statusCode: number;
  children?: React.ReactElement;
};

export type ErrorProps = {
  isReadyToRender: boolean;
} & NextErrorProps;

const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  const { statusCode, isReadyToRender, err, children = null } = props;
  // eslint-disable-next-line no-debugger

  if (!env.isDevelopment) {
    /* eslint-disable no-console */
    console.warn('ErrorPage - Unexpected error caught, it was captured and sent to Sentry. Error details:');
    /* eslint-disable no-console */
    console.error(err);
  }

  if (!isReadyToRender && err) {
    Sentry.captureException(err);
  }

  return <>{children ?? <NextErrorComponent statusCode={statusCode} />}</>;
};

ErrorPage.getInitialProps = async (props: NextPageContext): Promise<ErrorProps> => {
  const { res, err, asPath } = props;

  const errorInitialProps: ErrorProps = (await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext)) as ErrorProps;

  if (!env.isProduction) {
    /* eslint-disable no-console */
    console.error('ErrorPage.getInitialProps - Unexpected error caught, it was captured and sent to Sentry. Error details:', err);
  }

  errorInitialProps.isReadyToRender = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404, isReadyToRender: true };
  }

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  Sentry.captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
  await Sentry.flush(2000);

  return errorInitialProps;
};

export default ErrorPage;
