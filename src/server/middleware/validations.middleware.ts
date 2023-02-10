import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { idSchema, filterSchema } from './validation.types';

type TProperty = 'header' | 'body' | 'params' | 'query';

type TAllSchemas = Record<TProperty, any>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

/**
 * Generic request handler to be used as middleware to validate some of the parts from the request.
 * 
 * E.g.: const validationRequestHandler = validation({ TProperty: schema });
 * 
 * TProperties = 'header' | 'body' | 'params' | 'query'
 * 
 * @param schemas 
 * @returns TValidation is a RequestHandler
 */
export const validation: TValidation = (schemas) => async (req, res, next) => { 
    const errorsReturn: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        const field = key as TProperty;        
        try {
            schema.validateSync(req[field], { abortEarly: false });
        } catch(error) {
            const yupErrors = (error as yup.ValidationError);        
            const validationErrors: Record<string, string> = {};

            yupErrors.inner.forEach(e => {
                if (!e.path) return;
                validationErrors[e.path] = e.message;
            });

            errorsReturn[field] = validationErrors;
        }
    });

    if (Object.entries(errorsReturn).length === 0) {
        return next();
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsReturn });
    }
};

export const filterValidator = validation({ query: filterSchema });

export const idValidator = validation({ params: idSchema });