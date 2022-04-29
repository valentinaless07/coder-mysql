import express, { urlencoded } from 'express'
import { createServer } from "http";
import router from './routes/index.js'
import { Server } from "socket.io";
// import { getProducts, postProduct } from './controllers/productos.js';
import {mariaDb} from './options/mariaDb.js'
import {sqlite3Config} from './options/sqlite3.js'
import Contenedor from './controllers/Contenedor.js'
import Mensajes from './controllers/Mensajes.js'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', router)



app.set('view engine', 'ejs')
app.set('views', './views')

const mensajes = new Mensajes(sqlite3Config, 'ecommerce')
const productos = new Contenedor(mariaDb, 'productos')


// const messages = [
//   {
//   author: 'correo@gmail.com',
//   text:  'Hola',
//   date: "2022-04-13T17:05:06.858Z"
//   },
//   {
//     author: 'otrocorreo@gmail.com',
//     text:  'Hola',
//     date: "2022-04-13T17:05:18.858Z"
//     }
// ]

const server = app.listen(8080, () => {
    console.log(`Server running on port: ${server.address().port}`)
})

server.on('error', error=> console.log(`Error ${error}`))

const io = new Server(server, {
    
  // ...
});

io.on("connection", async (socket) => {
    console.log('Un cliente se ha conectado')

    socket.emit('products',  await productos.getProducts())

    socket.on('add-product', async (product) => {
      await productos.postProduct(product)
      io.sockets.emit('products', await productos.getProducts())
    })

    socket.emit('messages', await mensajes.getMessages())

    socket.on('new-message', async function(data){
        await mensajes.postMessage(data)
        io.sockets.emit('messages', await mensajes.getMessages())
       
    })

});



