// Define DB connections for different environments
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/localhost3000-dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/localhost3000-test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}