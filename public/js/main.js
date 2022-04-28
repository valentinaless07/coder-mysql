
let socket = io.connect()

socket.on('products', function (data){
    renderProducts(data).then((html) => {
        document.getElementById('productos').innerHTML = html
    })
 })

 async function renderProducts (data) {
    const hbs = await fetch('../views/productos.hbs')
    const view = await hbs.text()
    const handlebars = Handlebars.compile(view)
    const html = handlebars({ product: data })
    return html
 }

 const submitProduct = document.querySelector('#formProduct')
 

 submitProduct.addEventListener('submit', (e) => {
   e.preventDefault()
   const product = {
     title: submitProduct[0].value,
     price: submitProduct[1].value,
     thumbnail: submitProduct[2].value,
   }
   socket.emit('add-product', product)
   submitProduct.reset()
 })




socket.on('messages', function (data){
    render(data)
})


function render(data) {
    let html = data.map(function(elem, index){
      const f = new Date(elem.date)
      
      const date = f.getDate() + "/"+ (f.getMonth() +1) + "/" +f.getFullYear();
      const hour = f.getHours() < 10 ? '0'+f.getHours() : f.getHours()
      const minutes = f.getMinutes() < 10 ? '0'+f.getMinutes() : f.getMinutes()
      const seconds = f.getSeconds() < 10 ? '0'+f.getSeconds() : f.getSeconds()
      const hours = hour + ':' + minutes + ':' + seconds
        return(`<div class='text-justify mt-2'>
            <strong class="text-primary fw-bold">${elem.author} <span class='text-dark '>[<span class='text-danger'>${date} ${hours}</span>]</span></strong>:
            <em class='text-success'>${elem.text}</em> </div>`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html
}

function addMessage (e){
    let mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        date: new Date()
    }
    socket.emit('new-message', mensaje)
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false
    
}