import express, { urlencoded } from 'express'
import { createServer } from "http";
import router from './routes/index.js'
import { Server } from "socket.io";
import { getProducts, postProduct } from './controllers/productos.js';
import {mariaDb} from './options/mariaDb.js'


const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', router)



app.set('view engine', 'ejs')
app.set('views', './views')


mariaDb.createTable()
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

// const io = new Server(server, {
    
//   // ...
// });

// io.on("connection", async (socket) => {
//     console.log('Un cliente se ha conectado')

//     socket.emit('products',  getProducts())

//     socket.on('add-product', async (product) => {
//       postProduct(product)
//       io.sockets.emit('products', getProducts())
//     })

//     socket.emit('messages', messages)

//     socket.on('new-message', function(data){
//         messages.push(data)
//         io.sockets.emit('messages', messages)
       
//     })

// });



