class Contenedor {
    constructor(config, table){
            this.config = config
            this.table = table

            this.config.schema.hasTable(this.table).then(resp => {  
                if(!resp){
                    config.schema.createTable(this.table, table => {
                        table.string('thumbnail')
                        table.string('title')
                        table.float('price')
                        table.increments('id')
                    })
                    .then(() => console.log('table created'))
                    .catch((err) => console.log(`${err} error en mariaDb tabla productos`))
                  
                }
            })

            this.getProducts = async () => {
                const res = await config.from(table).select('*')
                return res
            }
    
            this.getById = async (id) => {
                const res = await config.from(table).select('*').where({ id })
                return res
            }
    
            this.postProduct = async (data) => {
                await config(table).insert(data)
                return 'Producto añadido'
            }
    
            this.editProduct = async (product, id) => {
                await config(table).where({ id }).update(product)
                return 'Producto modificado'
            }
    
    
            this.deleteProduct = async (id) => {
                console.log(id)
                await config(table).where({ id }).del()
                return 'Producto eliminado'
            }


    }



}

export default Contenedor