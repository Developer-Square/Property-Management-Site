import IErrorResponse from "interfaces/error";


/**
 * Formats error response from server
 * @param {any} err error response from server
 * @returns {String} error message as string
 */
const formatErrorMessage = (err: IErrorResponse | IErrorResponse['message'] | any): string => {
  if (typeof err === 'string') {
    return err;
  }
  if (err.message && typeof err.message === 'string') {
    return err.message;
  }
  return 'Unknown server error';
};

export default formatErrorMessage;
