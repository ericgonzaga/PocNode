import { Knex } from '../database/knex';
import { ETableNames } from '../database/knex/tables.enum';
import { IPessoa, IPessoaBody } from '../models';

export const getById = async (id: number): Promise<IPessoa | undefined | Error> => {
    try {
        return await Knex(ETableNames.pessoas).select().where('id', '=', id).first();        
    } catch(error) {
        console.log(error);
        return new Error('Pessoa.getById Error.');
    }
};

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const likeFilter = '%' + filter + '%';
        const [{ count }] = await Knex(ETableNames.pessoas)
            .whereLike('name', likeFilter)
            .count<[ { count: number }]>('* as count');

        if (Number.isInteger(count)) return Number(count);

        throw new Error('Error ao contar pessoa.');
    } catch(error) {
        console.log(error);
        return new Error('Pessoa.count Error.');
    }
};

export const list = async (page: number, limit: number, filter = ''): Promise<IPessoa[] | Error> => {
    try {
        const likeFilter = '%' + filter + '%';
        return await Knex(ETableNames.pessoas)
            .select()
            .whereLike('name', likeFilter)
            .orderBy('name')
            .offset((page - 1) * limit)
            .limit(limit);
    } catch(error) {
        console.log(error);
        return new Error('Pessoa.list Error.');
    }
};

export const create = async (pessoa: IPessoaBody): Promise<number | Error> => {
    try {
        const [ result ] = await Knex(ETableNames.pessoas).insert(pessoa).returning('id');        
        switch (typeof result) {
            case 'object': return result.id;
            case 'number': return result;
            default: throw new Error('Error ao criar pessoa.');
        }
    } catch(error) {
        console.log(error);
        return new Error('Pessoa.create Erro.');
    }
};

export const update = async (id: number, pessoa: IPessoaBody): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.pessoas).update(pessoa).where('id', '=', id);
        if (result > 0) return;
        else throw new Error('Error ao deletar pessoa.');
    } catch(error) {
        console.log(error);
        return new Error('Pessoa.deleteById Error.');
    }
};

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.pessoas).delete().where('id', '=', id);
        if (result > 0) return;
        else throw new Error('Error ao deletar pessoa.');
    } catch(error) {
        console.log(error);
        return new Error('Pessoa.deleteById Error.');
    }
};