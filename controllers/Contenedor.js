class Contenedor {
    constructor(knexConfig, tableName){
            this.knexConfig = knexConfig
            this.tableName = tableName


            this.createTable = async () => {
                if(this.tableName === 'productos'){
                    knexConfig.schema.createTable(this.tableName, table => {
                        table.string('thumbnail')
                        table.string('title')
                        table.float('price')
                        table.increments('id')
                    })
                    .then(() => console.log('table created'))
                    .catch((err) => console.log(`${err} error en mariaDb tabla productos`))
                    .finally(() => {
                        knexConfig.destroy()
                    })
                }
            }
    }

}

export default Contenedor