import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function setHeader(res: Response, headerName: string, value: string | number | readonly string[]): Response {
    res.setHeader('access-control-exposed-headers', headerName);
    res.setHeader(headerName, value);
    return res;
}

export function returnError(res: Response, status: StatusCodes, error: string): Response {
    return res.status(status).json({
        errors: {
            default: error
        }
    });
}