import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.boolean('complete')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todos')
}

