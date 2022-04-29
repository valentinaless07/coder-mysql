import { Router } from "express";
import Productos from  "../controllers/Contenedor.js";
import { mariaDb } from "../options/mariaDb.js";

const router = Router()

const productos = new Productos(mariaDb, 'productos')

router.get('/', async (req,res) => {
    try {

    const products = await productos.getProducts()
    res.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/:id', async (req,res) => {

    try {
    const {id} = req.params
    
     const producto = await productos.getById(id)

     if(!producto){
         res.status(404).json({
             error: 'producto no encontrado'
         })
     }

     res.status(200).send(producto)
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/', async (req,res) => {
    try {

      
         await productos.postProduct(req.body)

        
        

    
    } catch (error) {
        console.log(error)
    }
    
})

router.put('/:id', async (req,res) => {
    try {
        const producto = await productos.editProduct(req.body, req.params.id)

        if(!producto) res.status(404).json({error: 'producto no encontrado'})
        res.status(200).json(producto)
    } catch (error) {
        console.log(error)
    }
   
})

router.delete('/:id', async (req,res) => {
    try {
        const producto = await productos.deleteProduct(req.params.id)

    if(!producto) res.status(404).json({error: 'producto no encontrado'})
    res.status(200).json(producto)
    } catch (error) {
        console.log(error)
    }
    
})

export default router