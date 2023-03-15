import _ from 'lodash';
import {ErrorRequestHandler, RequestHandler} from 'express';
import httpErrors from 'http-errors';
import {messages, MessagesEnum} from '@libs/messages';

interface IErrorResponse {
  statusCode: number;
  message: string;
  code: string | null;
  data?: unknown;
}

export function defaultHeaders(): RequestHandler {
  return (req, res, next) => {
    res.set('x-powered-by', `${__app.name} - v${__app.version}`);
    return next();
  };
}

export function routeNotFoundHandler(): RequestHandler {
  return (req, res, next) => {
    return next(
      res.headersSent
        ? null
        : httpErrors.NotFound(`Path not found. ${req.method} ${req.originalUrl}`)
    );
  };
}

export function errorHandler(): ErrorRequestHandler {
  // eslint-disable-next-line
  return (err, req, res, next) => {
    const errorResponse = getErrorResponse(err);

    return res.status(errorResponse.statusCode).send(errorResponse);
  };
}

function getErrorResponse(err: httpErrors.HttpError | Error): IErrorResponse {
  const defaultErrorKey: MessagesEnum = 'unknownError';
  const httpError = httpErrors.isHttpError(err)
    ? err
    : httpErrors.NotImplemented(defaultErrorKey);
  const message = _.get(messages, httpError.message);

  return {
    code: message ? httpError.message : null,
    message: message ?? httpError.message,
    statusCode: httpError.statusCode,
  };
}
