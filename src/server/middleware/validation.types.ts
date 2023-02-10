import * as yup from 'yup';

export interface IIdProps {
    id: number;
}

export const idSchema: yup.ObjectSchema<IIdProps> = yup.object({
    id: yup.number().required().integer().positive()
});

export interface IFilterProps {
    filter?: string;
    limit?: number;
    page?: number;
}
  
export const filterSchema: yup.ObjectSchema<IFilterProps> = yup.object({
    filter: yup.string().optional(),
    limit: yup.number().optional().integer().positive(),
    page: yup.number().optional().integer().positive(),
});
