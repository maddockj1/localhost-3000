exports.up = function (knex, Promise) {
  return knex.schema.createTable('platforms', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('platform', 50).notNullable()
    table.string('company').notNullable()
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('platforms')
}