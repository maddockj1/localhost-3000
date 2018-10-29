
exports.up = function(knex, Promise) {
return knex.schema.createTable('event_users', function(table) {
 // TABLE COLUMN DEFINITIONS HERE
 table.integer('events_id')
 table.foreign('events_id').references('events.id')
 table.integer('users_id')
 table.foreign('users_id').references('users.id')
 table.timestamps(true, true)
})
}
exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('event_users')
}
