exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('username', 20).notNullable()
    table.string('email', 100).notNullable()
    table.string('firstName', 40).notNullable().defaultTo('')
    table.string('lastName', 40).notNullable().defaultTo('')
    table.string('address', 255).notNullable().defaultTo('')
    table.string('city', 100).notNullable().defaultTo('')
    table.integer('zip').notNullable()
    table.date('birthday').notNullable()
    table.integer('favoritePlatform').notNullable()
    table.foreign('favoritePlatform').references('platforms.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}