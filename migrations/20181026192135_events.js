
exports.up = function(knex, Promise) {
return knex.schema.createTable('events', function(table) {
 // TABLE COLUMN DEFINITIONS HERE
 table.increments()
 table.string('eventName', 255).notNullable().defaultTo('')
 table.integer('platform_id')
 table.foreign('platform_id').references('platforms.id')
 table.integer('host_id')
 /*   We need to figure out where we are going to reference this..
 table.foreign('host_id').references('hosts')
 */
 table.string('address', 255)
 table.string('city', 100)
 table.integer('zip', 255)
 table.string('link', 144)
 table.date('date').notNullable()
 table.time('start').notNullable()
 table.time('end').notNullable()
 table.string('description', 255)
 table.number('playerLimit')
 table.number('ageLimit')
 table.boolean('privacy').notNullable()
 table.timestamps(true, true)
})
}
exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('events')
}
