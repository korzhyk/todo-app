// Shared postgres env2config
const pgConnection = {
  host: process.env.PGHOST || '127.0.0.1',
  port: +process.env.PGPORT || 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
}

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: ':memory:',
  },

  staging: {
    client: 'postgresql',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

}

module.exports = config
