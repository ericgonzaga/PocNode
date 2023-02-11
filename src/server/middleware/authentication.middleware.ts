import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseHelper } from '../shared';

export const test: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return ResponseHelper.returnError(res, StatusCodes.UNAUTHORIZED, 'User not authenticated');
    } 

    const [ type, token ] = authorization.split(' ');
    if (type !== 'Bearer') {
        return ResponseHelper.returnError(res, StatusCodes.UNAUTHORIZED, 'User not authenticated');
    }

    // TODO: teste token-jwt

    return next();
};