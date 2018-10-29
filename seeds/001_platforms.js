exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('platforms').del()
    .then(function () {
      // Inserts seed entries
      return knex('platforms').insert([{
            id: 1,
            platform: 'Nintendo',
            createdAt: new Data(2018, 10, 28, 9, 30, 0, UTC),
            updatedAt: Date.now()
          },
          {
            id: 2,
            platform: 'Super Nintendo',
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            id: 3,
            platform: 'Nintendo 64',
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            id: 4,
            platform: 'Nintendo Wii',
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            id: 5,
            platform: 'Nintendo Switch',
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
        ])
        .then(function () {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('platforms_id_seq', (SELECT MAX(id) FROM platforms))")
        })
    })
}
