import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IPessoa } from '../../models/pessoa.type';
import { validation } from '../middleware';
import { idSchema, IFilterProps } from '../middleware/validation.types';

export const list = async (req: Request<{}, {}, {}, IFilterProps>, res: Response) => {
    res.setHeader('access-control-exposed-headers', 'x-total-count');
    res.setHeader('x-total-count', 1);
    
    //return res.json([{ id: 1 }]);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Method not implemented');
};

export const getById = async (req: Request, res: Response) => {
    return res.send(req.params.id);
};

//==========================================================================

const pessoaBodySchema: yup.ObjectSchema<IPessoa> = yup.object({
    name: yup.string().required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().optional().email()
});

export const createValidator = validation.validation({ body: pessoaBodySchema });

export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
    //return res.status(StatusCodes.CREATED).json({ id: 1}); 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Method not implemented');
}; 

export const updateValidator = validation.validation({ body: pessoaBodySchema, params: idSchema });

export const update = async (req: Request<{}, {}, IPessoa>, res: Response) => {
    return res.json(req.body);
};

//==========================================================================

export const del = async (req: Request, res: Response) => {
    return res.send(req.params.id);
};