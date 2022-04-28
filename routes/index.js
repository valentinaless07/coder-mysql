import { Router } from "express";
import { deleteProduct, editProduct, getById, getProducts, postProduct } from "../controllers/productos.js";

const router = Router()

router.get('/', async (req,res) => {
    try {
    const products = await getProducts()
    res.render('productos', { products } || { msg: "Producto no encontrado" })
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/:id', (req,res) => {

    try {
    const {id} = req.params
    
     const producto = getById(id)

     if(!producto){
         res.status(404).json({
             error: 'producto no encontrado'
         })
     }

     res.status(200).json(producto)
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/', async (req,res) => {
    try {

      
         postProduct(req.body)

        
        

    
    } catch (error) {
        console.log(error)
    }
    
})

router.put('/:id', async (req,res) => {
    try {
        const producto = await editProduct(req.body, req.params.id)

        if(!producto) res.status(404).json({error: 'producto no encontrado'})
        res.status(200).json(producto)
    } catch (error) {
        console.log(error)
    }
   
})

router.delete('/:id', async (req,res) => {
    try {
        const producto = deleteProduct(req.params.id)

    if(!producto) res.status(404).json({error: 'producto no encontrado'})
    res.status(200).json(producto)
    } catch (error) {
        console.log(error)
    }
    
})

export default router