exports.up = function (knex, Promise) {
  return knex.schema.createTable('events', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('eventName', 50).notNullable().defaultTo('')
    table.integer('platform_id').notNullable()
    table.foreign('platform_id').references('platforms.id').onDelete('CASCADE')
    table.integer('host_id').notNullable()
    table.foreign('host_id').references('users.id').onDelete('CASCADE')
    table.string('address', 255)
    table.string('city', 100)
    table.integer('zip', 255)
    table.string('link', 144)
    // table.date('date').notNullable()
    table.timestamp('start').notNullable()
    table.timestamp('end').notNullable()
    table.string('description', 255)
    table.integer('playerLimit')
    table.integer('ageLimit')
    table.boolean('privacy').notNullable()
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('events')
}