class Mensajes {
    constructor(config, table){
            this.config = config
            this.table = table

            this.config.schema.hasTable(this.table).then(resp => {  
                if(!resp){
                    config.schema.createTable(this.table, table => {
                        table.string('author')
                        table.string('date')
                        table.string('text')
                    })
                    .then(() => console.log('table created'))
                    .catch((err) => console.log(`${err} error en sqlite3 tabla mensajes`))
                  
                }
            })

            this.postMessage = async (msj) => {
                this.config(this.table).insert(msj)
                .then(res => res)
                .catch(err => console.log(err));
            }

            this.getMessages = async () => {
                try {
                    const messages = await this.config.from(this.table).select("*")
                    return messages
                  }
                  catch (err) { console.log(err); }
            }
            
        }

       
    
    }

    export default Mensajes