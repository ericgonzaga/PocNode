import { Knex } from 'knex';
import path from 'path';

// npx knex --knexfile .\src\database\knex\Environment.ts migrate:make teste

export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: path.resolve(__dirname, '../../../database.sqlite') },
    migrations: { directory: path.resolve(__dirname, '../migrations') },
    seeds: { directory: path.resolve(__dirname, '../seeds') },
    /*
    pool: { 
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
        }
    }
    */
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:'
};

export const production: Knex.Config = {
    ...development
};