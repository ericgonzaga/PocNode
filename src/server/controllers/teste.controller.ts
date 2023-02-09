import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../middleware';
import { IFilterProps } from '../shared/filter.types';

export const get = async (req: Request<{}, {}, {}, IFilterProps>, res: Response) => {
    return res.json(req.query);
};

export const getById = async (req: Request, res: Response) => {
    return res.send(req.params.id);
};

//==========================================================================

const testeBodySchema = yup.object({
    name: yup.string().min(3).required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().email(),
    website: yup.string().url().nullable(),
    createdOn: yup.date().default(() => new Date()),
    activated: yup.boolean().default(false)
});

type ITesteBody = yup.InferType<typeof testeBodySchema>;

export const testeBodyValidator = validation.validation({ body: testeBodySchema });

export const create = async (req: Request<{}, {}, ITesteBody>, res: Response) => {
    return res.json(req.body); 
}; 

export const update = async (req: Request<{}, {}, ITesteBody>, res: Response) => {
    return res.json(req.body);
};

//==========================================================================

export const del = async (req: Request, res: Response) => {
    return res.send(req.params.id);
};