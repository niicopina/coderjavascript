const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
cards.addEventListener('click', e => {
    addCarrito(e)
})
const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data);
        pintarCards(data)
    } catch (error) {
        console.log(error);
    }
}
const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}
const addCarrito = e => {
    //console.log(e.target.classList.contains('btn-dark'));
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}
const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p'),textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
}


/* const productos = [
    {id: 1, nombre: "Pan Dulce", precio: 5000},
    {id: 2, nombre: "Tiramisu", precio: 4500},
    {id: 3, nombre: "Torta Footbol", precio: 3700},
    {id: 4, nombre: "Cheescakes", precio: 6200},
 ];

const template = document.querySelector('#template-list').content
const fragment = document.createDocumentFragment()
arrayLista.forEach(item => {
    template.querySelector('.list span').textContent = item
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
})
lista.appendChild(fragment)

function agregarProducto(){
}
document.getElementById("btn").onclick = function (){
    agregarProducto();
} */