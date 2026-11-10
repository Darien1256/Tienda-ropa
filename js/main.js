/* =========================================================
   DR3X · main.js
   Un solo archivo para las 4 páginas. Cada bloque revisa primero si
   lo que necesita existe en la página (por eso los "if"): así un
   bloque nunca rompe a los demás.
   ========================================================= */


/* ---------- 1. MENÚ HAMBURGUESA ---------- */
const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");

if (btnMenu && menu) {
    btnMenu.addEventListener("click", () => {
        // toggle = si la clase está la quita, y si no está la pone
        const abierto = menu.classList.toggle("abierto");   // muestra/oculta el menú
        btnMenu.classList.toggle("activo", abierto);         // convierte las rayitas en X
        btnMenu.setAttribute("aria-expanded", abierto);      // avisa a lectores de pantalla
    });

    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll("#menu a").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            menu.classList.remove("abierto");
            btnMenu.classList.remove("activo");
            btnMenu.setAttribute("aria-expanded", "false");
        });
    });
}


/* ---------- 2. ACCORDION (preguntas frecuentes) ---------- */
// OJO: la clase es "accordion" (con dos c), igual que en el HTML y en el CSS.
const titulos = document.querySelectorAll(".accordion .titulo");   // todos los botones, no solo el primero

titulos.forEach((titulo) => {
    titulo.addEventListener("click", () => {
        const item = titulo.parentElement;                         // la caja .item de este botón

        // Cerrar los demás para que solo haya uno abierto
        document.querySelectorAll(".accordion .item").forEach((otro) => {
            if (otro !== item) otro.classList.remove("activo");
        });

        item.classList.toggle("activo");                           // abrir o cerrar el que tocaste
    });
});


/* ---------- 3. CARDS GENERADAS DESDE UN ARREGLO ---------- */
const MONEDA = "₡";      // si usas otra moneda, cámbiala solo aquí (por ejemplo "$")

// Prendas de la galería (index.php). Para agregar una más, copia una línea y cambia sus datos.
const prendas = [
    { titulo: "Vestido punk",           descripcion: "Falda asimétrica de tartán, malla y cadenas para destacar de noche.", precio: 34900, img: "img/Vestidopunk.jpg",     alt: "Vestido punk negro con falda de cuadros rojos y cadenas" },
    { titulo: "Playera desgastada",     descripcion: "Oversize con acabado envejecido y detalles rasgados.",                precio: 18900, img: "img/Camisapunk.jpg",      alt: "Playera negra oversize con efecto desgastado y rasgaduras" },
    { titulo: "Pantalón punk",          descripcion: "Pantalón negro con correas, hebillas y parches.",                     precio: 29900, img: "img/Pantalonpunk.jpg",    alt: "Pantalón negro rasgado con correas y hebillas" },
    { titulo: "Chaqueta negra",         descripcion: "Estilo cuero, ideal para los días frescos.",                          precio: 42500, img: "img/chaqueta.jpg",        alt: "Chaqueta negra estilo cuero con cierre" },
    { titulo: "Falda plisada",          descripcion: "Plisada con herrajes y correa lateral.",                              precio: 16500, img: "img/falda.jpg",           alt: "Falda plisada negra con correa y botones metálicos" },
    { titulo: "Pantalón cargo",         descripcion: "Holgado, con bolsillos laterales y mucho espacio.",                   precio: 24900, img: "img/pantalon-hombre.jpg", alt: "Pantalón cargo negro holgado con bolsillos laterales" }
];

// Servicios (servicios.php)
const servicios = [
    { titulo: "Lavandería",             descripcion: "Lavado y secado de sus prendas, con cuidado según la etiqueta.",      precio: 8000,  img: "img/lavanderia.jpg",      alt: "Ícono de una lavadora" },
    { titulo: "Planchado",              descripcion: "Prendas listas para usar, sin arrugas y dobladas.",                   precio: 3000,  img: "img/planchado.jpg",       alt: "Ícono de una plancha con vapor" },
    { titulo: "Tintorería",             descripcion: "Limpieza en seco para abrigos, chaquetas y telas delicadas.",         precio: 10000, img: "img/tintoreria.jpg",      alt: "Ícono de una camisa colgada en un gancho" },
    { titulo: "Asesoría de imagen",     descripcion: "Una sesión para combinar prendas y colores según su estilo.",         precio: 25000, img: "img/asesoria.jpg",        alt: "Ícono de un maniquí con cinta métrica" },
    { titulo: "Arreglos y ajustes",     descripcion: "Ruedos, botones, cierres y ajustes a su medida.",                     precio: 6000,  img: "img/arreglos.jpg",        alt: "Ícono de un botón con hilo y aguja" },
    { titulo: "Personalización punk",   descripcion: "Parches, tachas y estampados para hacer su prenda única.",            precio: 12000, img: "img/personalizacion.jpg", alt: "Ícono de un imperdible con tachas" }
];

// Dibuja una tarjeta por cada elemento de la lista dentro del contenedor indicado.
function pintarCards(lista, contenedor) {
    if (!contenedor) return;            // si esta página no tiene ese contenedor, no hace nada
    contenedor.innerHTML = "";          // limpiar antes de pintar, para no duplicar tarjetas
    lista.forEach((item) => {
        const art = document.createElement("article");
        art.classList.add("tarjeta");
        art.innerHTML = `
            <img src="${item.img}" alt="${item.alt}" loading="lazy">
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <p class="precio">${MONEDA}${item.precio.toLocaleString("es-CR")}</p>
            <a href="contacto.php" class="boton">Consultar</a>
        `;
        contenedor.appendChild(art);
    });
}

pintarCards(prendas, document.querySelector("#galeria"));              // solo existe en index.php
pintarCards(servicios, document.querySelector("#lista-servicios"));    // solo existe en servicios.php


/* ---------- 4. CARRUSEL (opcional: solo funciona en una página que tenga .slide) ---------- */
const slides = document.querySelectorAll(".slide");
const btnAnterior = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");
let actual = 0;

function mostrar(i) {
    slides.forEach((s) => s.classList.remove("activa"));
    slides[i].classList.add("activa");
}

if (slides.length > 0 && btnAnterior && btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
        actual = (actual + 1) % slides.length;
        mostrar(actual);
    });
    btnAnterior.addEventListener("click", () => {
        actual = (actual - 1 + slides.length) % slides.length;
        mostrar(actual);
    });
}


/* ---------- 5. VALIDACIÓN DEL FORMULARIO (contacto.php) ---------- */
const form = document.querySelector("#formulario");

if (form) {
    form.addEventListener("submit", (e) => {
        const nombre = form.nombre.value.trim();     // trim() quita espacios al inicio y al final
        const correo = form.correo.value.trim();     // OJO: es "correo", igual que el name del input
        const mensaje = form.mensaje.value.trim();
        const errores = [];

        if (nombre === "") errores.push("El nombre es obligatorio.");
        if (!correo.includes("@")) errores.push("El correo debe ser válido.");
        if (mensaje === "") errores.push("El mensaje es obligatorio.");

        const zonaMensajes = document.querySelector("#mensajes");

        if (errores.length > 0) {
            e.preventDefault();                       // frena el envío del formulario
            zonaMensajes.textContent = errores.join(" ");
        } else {
            zonaMensajes.textContent = "";            // todo bien: se limpia y el formulario se envía
        }
    });
}
