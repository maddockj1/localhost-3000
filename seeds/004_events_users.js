exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('events_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('events_users').insert([{
          events_id: 1,
          users_id: 1
        },
        // {
        //   events_id: 1,
        //   users_id: 2
        // },
        // {
        //   events_id: 1,
        //   users_id: 3
        // },
        // {
        //   events_id: 2,
        //   users_id: 2
        // },
        // {
        //   events_id: 2,
        //   users_id: 1
        // },
        // {
        //   events_id: 3,
        //   users_id: 3
        // }
      ])
    })
}