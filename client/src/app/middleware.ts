import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import IErrorResponse from 'interfaces/error';
import formatErrorMessage from 'utils/formatErrorMessage';

// eslint-disable-next-line import/prefer-default-export
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error(formatErrorMessage(action.payload.data as IErrorResponse | IErrorResponse['message']))
  }

  return next(action);
};
