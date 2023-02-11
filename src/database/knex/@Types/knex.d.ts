import { IPessoa } from '../../../models';

declare module 'knex/types/tables' {
    interface Tables {
        pessoas: IPessoa
    }
}