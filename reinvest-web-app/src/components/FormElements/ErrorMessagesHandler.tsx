import { getMessages } from 'reinvest-app-common/src/services/form-flow/utilities/getMessages';
import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';

import { FormMessage } from './FormMessage';

export const ErrorMessagesHandler = ({ error }: { error: ErrorResponse }) => {
  return (
    <div>
      {getMessages(error).map(message => (
        <FormMessage
          message={message || 'Internal error'}
          key={message}
        />
      ))}
    </div>
  );
};
