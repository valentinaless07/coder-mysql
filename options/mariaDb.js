import knex from "knex";
import Contenedor from "../controllers/Contenedor.js";

export const options = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 8080,
        user: 'root',
        password: '',
        database: 'test'
    }
})

export const mariaDb = new Contenedor(options, 'productos')