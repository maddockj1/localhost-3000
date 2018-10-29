exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('platforms').del()
    .then(function () {
      // Inserts seed entries
      return knex('platforms').insert([{
            id: 1,
            platform: 'Nintendo',
            company: 'Nintendo',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 2,
            platform: 'Super Nintendo',
            company: 'Nintendo',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 3,
            platform: 'Nintendo 64 ',
            company: 'Nintendo',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 4,
            platform: 'Nintendo Wii',
            company: 'Nintendo',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 5,
            platform: 'Nintendo Switch',
            company: 'Nintendo',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 6,
            platform: 'Playstation',
            company: 'Sony',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 7,
            platform: 'Playstation 2',
            company: 'Sony',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 8,
            platform: 'Playstation 3',
            company: 'Sony',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 9,
            platform: 'Playstation 4',
            company: 'Sony',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 10,
            platform: 'Nintendo Gamecube',
            company: 'Nintendo',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 11,
            platform: 'Sega Genesis',
            company: 'Sega',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 12,
            platform: 'Xbox',
            company: 'Microsoft',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 13,
            platform: 'Xbox 360',
            company: 'Microsoft',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 14,
            platform: 'Xbox One',
            company: 'Microsoft',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 15,
            platform: 'Board Game',
            company: 'other',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 16,
            platform: 'Pencil/Paper Tabletop Game',
            company: 'other',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 17,
            platform: 'Sega Dreamcast',
            company: 'Sega',
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },

        ])
        .then(function () {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('platforms_id_seq', (SELECT MAX(id) FROM platforms))")
        })
    })
}