exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('username').notNullable()
    table.string('email', 100).notNullable()
    table.string('twitchId').notNullable()
    table.string('firstName', 40).defaultTo('')
    table.string('lastName', 40).defaultTo('')
    table.string('address', 255).defaultTo('')
    table.string('city', 100).defaultTo('')
    table.integer('zip')
    table.date('birthday')
    table.integer('favoritePlatform')
    table.foreign('favoritePlatform').references('platforms.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}