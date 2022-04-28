const Knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    port: 8080,
    password: "",
    database: "prueba",
  },
});

Knex.schema.createTable("productos", (table) => {
  table.string("thumbnail");
  table.string("title");
  table.float("price");
  table.increments("id");
})
.then(() => console.log('table created'))
.catch((err) => console.log(`${err} error en mariaDb tabla productos`))
.finally(() => {
    Knex.destroy()
})