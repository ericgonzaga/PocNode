import { Knex } from 'knex';
import { ETableNames } from '../knex/tables.enum';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.pessoas, table => {
        table.bigIncrements('id').primary().index();
        table.string('name', 100).checkLength('<=', 100).notNullable();
        table.integer('age').notNullable();
        table.string('email', 100).checkLength('<=', 100).nullable();
        
        table.comment('Tabela de pessoas');
    }).then(() => {
        console.log(`# create table ${ETableNames.pessoas} ok`);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.pessoas);
}