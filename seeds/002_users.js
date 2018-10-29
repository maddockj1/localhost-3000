exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
            id: 1,
            username: 'Stinkfloyd',
            email: 'nicholas_tzavaras@yahoo.com',
            firstName: 'Nick',
            lastName: 'Tzavaras',
            address: '3700 Hayden Place #2',
            city: 'Boulder',
            zip: 80301,
            birthday: new Date(1985, 12, 25),
            favoritePlatform: 9,
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 2,
            username: 'MaddockJr',
            email: 'john_email@aol.com',
            firstName: 'John',
            lastName: 'Maddock',
            address: '1687 McKenzie Drive',
            city: 'Boulder',
            zip: 80301,
            birthday: new Date(1989, 9, 16),
            favoritePlatform: 14,
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 3,
            username: 'GraftonDotJosh',
            email: 'joshDOTgrafton@myspace.com',
            firstName: 'Josh',
            lastName: 'Grafton',
            address: '224 Upthestreet Drive',
            city: 'Boulder',
            zip: 80301,
            birthday: new Date(1900, 12, 1),
            favoritePlatform: 11,
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
        ])
        .then(function () {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
        })
    })
}