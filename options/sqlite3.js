import Knex from "knex"

export const sqlite3Config = Knex({
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
})