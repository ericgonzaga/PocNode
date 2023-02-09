import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import { filterSchema, idSchema } from './validation.types';

type TProperties = 'header' | 'body' | 'params' | 'query';

type TAllSchemas = Record<TProperties, any>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => { 
    
    const errorsReturn: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        const field = key as TProperties;        
        try {
            schema.validateSync(req[field], { abortEarly: false });
        } catch(error) {
            const yupErrors = (error as ValidationError);        
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