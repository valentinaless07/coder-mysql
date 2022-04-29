import knex from "knex";



export const mariaDb = knex({
    client: "mysql",
    connection: {
      host: "192.168.64.2",
      user: "superuser",
      password: "password",
      database: "codermysql",
      port: 3306
  
    },
  });


