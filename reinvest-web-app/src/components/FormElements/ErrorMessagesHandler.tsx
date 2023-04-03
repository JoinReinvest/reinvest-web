import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';

import { FormMessage, getMessage } from './FormMessage';

export const ErrorMessagesHandler = ({ error }: { error: ErrorResponse }) => {
  return (
    <div>
      {getMessage(error).map(message => (
        <FormMessage
          message={message || 'Internal error'}
          key={message}
        />
      ))}
    </div>
  );
};
