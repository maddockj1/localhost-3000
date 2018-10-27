
exports.up = function(knex, Promise) {
return knex.schema.createTable('event_users', function(table) {
 // TABLE COLUMN DEFINITIONS HERE
 table.increments()
 table.integer('event_id')
 table.foreign('events').references('events.id')
 table.integer('user_id')
 table.foreign('users').references('users.id')
 table.timestamps(true, true)
})
}
exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('event_users')
}
