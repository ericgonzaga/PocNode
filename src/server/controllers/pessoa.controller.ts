import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IPessoa, IPessoaBody } from '../../models';
import { PessoaProvider } from '../../providers';
import { ValidationsMiddleware } from '../middleware';
import { idSchema, IFilterProps } from '../middleware';
import { ResponseHelper } from '../shared';

export const list = async (req: Request<{}, {}, {}, IFilterProps>, res: Response) => {
    const result = await PessoaProvider.list(req.query.page || 1, req.query.limit || 100, req.query.filter);
    if (result instanceof Error) {
        return ResponseHelper.returnError(res, StatusCodes.INTERNAL_SERVER_ERROR, result.message);
    }
    
    const count = await PessoaProvider.count(req.query.filter);
    if (count instanceof Error) {
        return ResponseHelper.returnError(res, StatusCodes.INTERNAL_SERVER_ERROR, count.message);
    }   
    
    res = ResponseHelper.setHeader(res, 'x-total-count', count);
    return res.json(result);
};

export const getById = async (req: Request, res: Response) => {
    const result = await PessoaProvider.getById(Number(req.params.id));
    
    if (result instanceof Error) {
        return ResponseHelper.returnError(res, StatusCodes.INTERNAL_SERVER_ERROR, result.message);
    } 
    
    return res.json(result);
};

//==========================================================================

const pessoaBodySchema: yup.ObjectSchema<IPessoaBody> = yup.object({
    name: yup.string().required().min(3).max(100),
    age: yup.number().required().positive().integer(),
    email: yup.string().optional().email().max(100)
});

export const createValidator = ValidationsMiddleware.validation({ body: pessoaBodySchema });

export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
    const result = await PessoaProvider.create(req.body);

    if (result instanceof Error) {
        return ResponseHelper.returnError(res, StatusCodes.INTERNAL_SERVER_ERROR, result.message);
    }

    return res.status(StatusCodes.CREATED).json({ id: result });    
}; 

export const updateValidator = ValidationsMiddleware.validation({ body: pessoaBodySchema, params: idSchema });

export const update = async (req: Request, res: Response) => {
    const result = await PessoaProvider.update(Number(req.params.id), req.body);

    if (result instanceof Error) {
        return ResponseHelper.returnError(res, StatusCodes.INTERNAL_SERVER_ERROR, result.message);
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};

//==========================================================================

export const deleteById = async (req: Request, res: Response) => {
    const result = await PessoaProvider.deleteById(Number(req.params.id));

    if (result instanceof Error) {
        return ResponseHelper.returnError(res, StatusCodes.INTERNAL_SERVER_ERROR, result.message);
    }

    return res.status(StatusCodes.NO_CONTENT).send();    
};