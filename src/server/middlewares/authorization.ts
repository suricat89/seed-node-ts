import _ from 'lodash';
import jwt, {JwtPayload} from 'jsonwebtoken';
import httpErrors from 'http-errors';
import {Request, RequestHandler} from 'express';
import {config} from '@config';

function getToken(req: Request) {
  const {blockMissingBearer} = config.authorization;

  const reqToken = _.defaultTo(
    req.headers.authorization,
    req.headers['x-api-key']
  ) as string | undefined;

  if (!reqToken) {
    throw httpErrors.Unauthorized('authorization1');
  }

  if (blockMissingBearer && !_.startsWith(reqToken, 'Bearer ')) {
    throw httpErrors.Unauthorized('authorization2');
  }

  return _.replace(reqToken, /^Bearer /, '');
}

function validateAuthorization(
  authorizedProfiles: string[],
  tokenProfiles: string[]
) {
  if (!authorizedProfiles.length) {
    return;
  }

  for (const authorizedProfile of authorizedProfiles) {
    const isAuthorized = _.includes(tokenProfiles, authorizedProfile);
    if (isAuthorized) {
      return;
    }
  }

  throw httpErrors.Forbidden('authorization3');
}

export function authorizeJwt(...authorizedProfiles: string[]): RequestHandler {
  return async (req, res, next) => {
    const {jwtSecret} = config.authorization;

    const token = getToken(req);
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    const tokenProfiles = decodedToken.profiles;

    validateAuthorization(authorizedProfiles, tokenProfiles);

    req.__authorizedUser = {
      profiles: tokenProfiles,
      sub: decodedToken.sub || '',
    };

    return next();
  };
}
