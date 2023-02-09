import * as yup from 'yup';

export const filterSchema = yup.object({
    filter: yup.string().notRequired(),
    page: yup.number().integer().moreThan(0),
    limit: yup.number().integer().moreThan(0)
});

export type IFilterProps = yup.InferType<typeof filterSchema>;

export const idSchema = yup.object({
    id: yup.number().required().integer().positive()
});

export type IIdProps = yup.InferType<typeof idSchema>;
