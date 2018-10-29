exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('platforms_events').del()
    .then(function () {
      // Inserts seed entries
      return knex('platforms_events').insert([{
          event_id: 1,
          platform_id: 9
        },
        {
          event_id: 2,
          platform_id: 5
        },
        {
          event_id: 3,
          platform_id: 16
        }
      ])
    })
}