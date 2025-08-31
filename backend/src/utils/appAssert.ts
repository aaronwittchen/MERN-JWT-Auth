import assert from 'node:assert';
import AppError from './AppError';
import { HttpStatusCode } from '../constants/http';
import AppErrorCode from '../constants/appErrorCode';

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is false.
 */
const appAssert: AppAssert = (
  condition: any,
  HttpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(HttpStatusCode, message, appErrorCode));

export default appAssert;
