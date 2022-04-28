 
    let productos  = [{nombre:"BACK TO THE FUTURE BLACK T-SHIRT",descripcion:"As Doc and Marty know all too well, sometimes you gotta' go back to go forward! So hit speed 88 and gear up for a whirlwind adventure like no other with this wicked tee from the iconic 1985 sci-fi sensation, Back To The Future. Official merchandise.",foto:"https://d1x7zurbps6occ.cloudfront.net/product/xlarge/994811-299256.jpg",id:1,precio:10,stock:20,timeStamp:1650382444922,codigo:"BACK-TO-THE-FUTURE-BLACK-T-SHIRT"},{nombre:"STRANGER THINGS BLACK T-SHIRT",descripcion:"This simple but awesome tee features the Stranger Things logo, everyone's favourite 80's supernatural horror show. Whether you love the Eleven, Mike and the gang's fight against demogorgons and the upside down or you can't get enough of Hopper, this is the t-shirt for you. Official merchandise.",foto:"https://d1x7zurbps6occ.cloudfront.net/product/xlarge/1117244-332561.jpg",id:2,precio:12,stock:10,timeStamp:1650382605225,codigo:"STRANGER-THINGS-BLACK-T-SHIRT"},{nombre:"RICK AND MORTY WHITE T-SHIRT",descripcion:"Wubba Lubba Dub Dub! Rick and Morty are featured in usually surreal style on this wonderfully weird monochrome tee. Journey to worlds aplenty, each more bizarre than the last, with Rick's portal gun. Official merchandise.",foto:"https://d1x7zurbps6occ.cloudfront.net/product/xlarge/1099689-325672.jpg",id:3,precio:11,stock:15,timeStamp:1650382704644,codigo:"RICK-AND-MORTY-WHITE-T-SHIRT"}]



export const getProducts = () => {
    return productos
}

export const getById = (id) => {
    
    const producto = productos.find(el => el.id == id)

    
    return producto
}

export const postProduct = (data) => {
    const {title, price, thumbnail} = data

    

    const producto = {
        title,
        price,
        thumbnail,
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1
    }
    productos.push(producto)

    return producto
}

export const editProduct = (product, id) => {
    const {title, price, thumbnail} = product
    
    const productById = productos.find(el => el.id == id)

    if(!productById) return undefined
    productById.title = title ? title : productById.title
    productById.price = price ? price : productById.price
    productById.thumbnail = thumbnail ? thumbnail : productById.thumbnail

    return productById

}

export const deleteProduct = (id) => {
    const productById = productos.find(el => el.id == id)

    if(!productById) return undefined
    productos = productos.filter(el => el.id != id)
    
    return productos
}