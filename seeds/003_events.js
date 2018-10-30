exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([{
            id: 1,
            eventName: `Stink's Super Smash Beatdown`,
            platform_id: 9,
            host_id: 1,
            address: `3700 Hayden Place #2`,
            city: `Boulder`,
            zip: 80301,
            // date: new Date(11, 15, 2018),
            start: new Date(2018, 11, 15, 7, 30, 0, 0),
            end: new Date(2018, 11, 15, 9, 30, 0, 0),
            description: "We are gonna play some SMASH BROS on the PLAYSTATION 4! SAY WHAAAT?",
            playerLimit: 4,
            ageLimit: 18,
            privacy: false,
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 2,
            eventName: `John's Mario Party`,
            platform_id: 5,
            host_id: 2,
            link: "www.johnsmarioparty.com",
            // date: new Date(11, 4, 2018),
            start: new Date(2018, 11, 4, 3, 30, 0, 0),
            end: new Date(2018, 11, 4, 9, 30, 0, 0),
            description: "All I do is party!",
            privacy: true,
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          },
          {
            id: 3,
            eventName: `Monopoly Marathon`,
            platform_id: 16,
            host_id: 3,
            address: `YMCA on 28th`,
            city: `Boulder`,
            // date: new Date(11, 4, 2018),
            start: new Date(2018, 11, 1, 15, 30, 0, 0),
            end: new Date(2018, 11, 1, 17, 30, 0, 0),
            description: "No matter how long it takes, the game always ends with the table getting flipped.",
            privacy: false,
            created_at: new Date(2018, 10, 28, 9, 30, 0, 0),
            updated_at: new Date(2018, 10, 28, 9, 30, 0, 0)
          }
        ])
        .then(function () {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))")
        })
    })
}