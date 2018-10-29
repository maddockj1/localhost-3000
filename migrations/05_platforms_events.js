
exports.up = function(knex, Promise) {
return knex.schema.createTable('platforms_events', function(table) {
 // TABLE COLUMN DEFINITIONS HERE
 table.increments()
 table.integer('platform_id')
 table.foreign('platform_id').references('platforms.id')
 table.integer('event_id')
 table.foreign('event_id').references('events.id')
 table.timestamps(true, true)
})
}
exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('platforms_events')
}
