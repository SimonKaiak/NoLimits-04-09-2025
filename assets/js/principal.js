const productosData = {
    peliculas: [
        { nombre: "Película 1", precio: 12000, img: "https://via.placeholder.com/150" },
        { nombre: "Película 2", precio: 15000, img: "https://via.placeholder.com/150" }
    ],
    videoJuegos: [
        { nombre: "videoJuego 1", precio: 25000, img: "https://via.placeholder.com/150" },
        { nombre: "videoJuego 2", precio: 30000, img: "https://via.placeholder.com/150" }
    ],
    accesorios: [
        { nombre: "Accesorio 1", precio: 5000, img: "https://via.placeholder.com/150" },
        { nombre: "Accesorio 2", precio: 8000, img: "https://via.placeholder.com/150" }
    ]
};

let carrito = [];

// Función para mostrar productos en la sección correspondiente
function mostrarCategoria(categoria) {
    const contenedores = {
        peliculas: document.getElementById('productos-peliculas'),
        videoJuegos: document.getElementById('productos-videoJuegos'),
        accesorios: document.getElementById('productos-accesorios')
    };

    // Limpiamos solo la categoría que vamos a mostrar (opcional)
    Object.values(contenedores).forEach(c => c.innerHTML = "");

    productosData[categoria].forEach(producto => {
        contenedores[categoria].innerHTML += `
            <div class="producto card p-2 m-2" style="width: 12rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio.toLocaleString()}</p>
                    <button class="btn btn-success" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar</button>
                </div>
            </div>
        `;
    });

    // Scroll automático hacia la sección
    document.getElementById(`seccion-${categoria}`).scrollIntoView({ behavior: 'smooth' });
}

// Funciones del carrito (sin cambios)
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    document.getElementById('contador').textContent = carrito.length;
    let lista = document.getElementById('carrito');
    let total = 0;
    lista.innerHTML = "";
    carrito.forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `
        <li>
            ${item.nombre} - $${item.precio.toLocaleString()}
            <button onclick="eliminarDelCarrito(${index})">❌</button>
        </li>`;
    });
    document.getElementById('total').textContent = total.toLocaleString();
    localStorage.setItem('totalCompra', total);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function abrirCarrito() {
    document.getElementById('modeloCarrito').style.display = "flex";
}

function cerrarCarrito() {
    document.getElementById('modeloCarrito').style.display = "none";
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 🛒");
    } else {
        const total = carrito.reduce((acc, item) => acc + item.precio, 0);
        localStorage.setItem('totalCompra', total); // Guardar total en localStorage cambio del dia 06-09-2025
        window.location.href = 'metodoPago.html';// para redirigir a la página de método de pago
    }
}


// Inicializa mostrando películas
mostrarCategoria('peliculas');


function mostrarMensajeCarrito() {
    const mensaje = document.getElementById("mensaje-carrito");
    mensaje.classList.remove("d-none"); // Mostrar

    // Ocultar después de 2 segundos
    setTimeout(() => {
    mensaje.classList.add("d-none");
    }, 2000);
}
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    mostrarMensajeCarrito(); // Mostrar mensaje al agregar
}

    // Este script es para filtrar las peliculas/juegos/accesorios para que se oculten cuando se seleccione una categoria
function filtrarCategoria(categoria) {
    let productos = document.querySelectorAll('.producto');
    productos.forEach(prod => prod.style.display = 'none');

    if (categoria === 'todos') {
                productos.forEach(prod => prod.style.display = 'block');
    } else {
        let filtrados = document.querySelectorAll('.' + categoria);
        filtrados.forEach(prod => prod.style.display = 'block');
    }
}