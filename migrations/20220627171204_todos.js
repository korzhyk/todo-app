module.exports.up = async function up(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.boolean('complete')
  })
}
module.exports.down = async function down(knex) {
  return knex.schema.dropTable('todos')
}
