let carrito = Storage.cargarCarrito();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-add').forEach(boton => {
        boton.addEventListener('click', e => {
            const tarjeta = e.target.closest('.product-card');
            const nombre = tarjeta.querySelector('.product-name').textContent;
            const precio = parseInt(
                tarjeta.querySelector('.product-price')
                    .textContent
                    .replace(/[^0-9]/g, ''),
                10
            );
            agregarAlCarrito(nombre, precio);
        });
    });

    // Delegación de eventos del carrito
    document.querySelector('.cart-content').addEventListener('click', manejarAccionesCarrito);
    document.querySelector('.btn-checkout').addEventListener('click', confirmarPedido);
    actualizarInterfazCarrito();
});

function guardarCarrito() {
    Storage.guardarCarrito(carrito);
}

function agregarAlCarrito(nombre, precio){
    const producto = carrito.find(item=>item.nombre===nombre);

    if(producto){
        producto.cantidad++;
    }
    else{
        carrito.push({
            nombre,
            precio,
            cantidad:1
        });
    }
    guardarCarrito();
    actualizarInterfazCarrito();
}

function disminuirProducto(nombre){
    const producto = carrito.find(item=>item.nombre===nombre);

    if(!producto) return;

    producto.cantidad--;

    if(producto.cantidad<=0){
        carrito=carrito.filter(item=>item.nombre!==nombre);
    }
    guardarCarrito();
    actualizarInterfazCarrito();
}

function aumentarProducto(nombre){
    const producto=carrito.find(item=>item.nombre===nombre);

    if(!producto) return;

    producto.cantidad++;
    guardarCarrito();
    actualizarInterfazCarrito();
}

function vaciarCarrito(){
    Modal.confirmar({
        titulo:"Vaciar carrito",
        mensaje:"¿Deseas eliminar todos los productos del carrito?",
        textoConfirmar:"Vaciar",
        onConfirm:()=>{
            carrito=[];
            Storage.limpiarCarrito();
            actualizarInterfazCarrito();
        }
    });
}

function confirmarPedido(){
    if(carrito.length===0){
        Modal.alerta({
            titulo:"Carrito vacío",
            mensaje:"Agrega al menos un producto antes de continuar."
        });
        return;
    }

    let resumen="";
    let total=0;

    carrito.forEach(item=>{
        total+=item.precio*item.cantidad;
        resumen+=`${item.nombre} x${item.cantidad}<br>`;
    });

    Modal.confirmar({
        titulo:"Confirmar pedido",

        permitirHTML:true,

        mensaje:`
            ${resumen}
            <hr>
            <strong>Total:</strong>
            $${total.toLocaleString('es-CL')}
        `,

        textoConfirmar:"Confirmar",
        onConfirm:()=>{
            carrito=[];
            Storage.limpiarCarrito();
            actualizarInterfazCarrito();
            Modal.alerta({
                titulo:"Pedido recibido",
                mensaje:"Gracias por confiar en Atlas Industrial."
            });
        }
    });
}

function manejarAccionesCarrito(e){
    const boton=e.target.closest('button');

    if(!boton) return;

    const nombre=boton.dataset.nombre;
    const accion=boton.dataset.accion;

    if(accion==="sumar"){
        aumentarProducto(nombre);
    }
    else if(accion==="restar"){
        disminuirProducto(nombre);
    }
    else if(accion==="vaciar"){
        vaciarCarrito();
    }
}

function actualizarInterfazCarrito() {
    const cartContent = document.querySelector('.cart-content');
    const cartCount = document.querySelector('.cart-count');
    const totalSummary = document.querySelector('.summary-row span:last-child');

    const totalArticulos = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    cartCount.textContent = totalArticulos;

    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');

    if (carrito.length === 0) {
        cartContent.innerHTML = '<p class="cart-empty">No has agregado productos a tu lista todavía.</p>';
        totalSummary.textContent = '$0';
        return;
    }

    let htmlContenido = '<div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">';
    let totalPrecio = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalPrecio += subtotal;

        htmlContenido += `
        <div class="cart-item">
            <div>
                <strong>${item.nombre}</strong>
                <div class="cart-controls">
                    <button
                        class="cart-signos"
                        data-accion="restar"
                        data-nombre="${item.nombre}">
                        −
                    </button>
                    <span>${item.cantidad}</span>
                    <button
                        class="cart-signos"
                        data-accion="sumar"
                        data-nombre="${item.nombre}">
                        +
                    </button>
                </div>
            </div>
            <strong>
                $${subtotal.toLocaleString('es-CL')}
            </strong>
        </div>
        `;
    });

    htmlContenido += '</div>';
    htmlContenido+=`
    <button
    class="btn-secondary"
    data-accion="vaciar">
    Vaciar carrito
    </button>
    `;
    cartContent.innerHTML = htmlContenido;
    totalSummary.textContent = `$${totalPrecio.toLocaleString('es-CL')}`;
}