/* =========================================================
   DR3X · main.js
   Un solo archivo para las páginas. Cada bloque revisa primero si
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

// OFERTA DE BLACK FRIDAY: porcentaje de descuento de las prendas marcadas con  oferta: true  (más abajo).
// Para quitar la oferta pon 0 y las tarjetas vuelven a mostrar el precio normal.
// (Si cambias el 30, cambia también los textos "30%" de index.php.)
const DESCUENTO = 30;

// Escribe un número como dinero: dinero(34900) -> "₡34 900"
function dinero(numero) {
    return MONEDA + numero.toLocaleString("es-CR");
}

// Solo están en oferta las prendas marcadas con  oferta: true.  Las demás prendas y los servicios
// conservan su precio normal. Para poner o quitar una prenda de la oferta, agrega o borra ese  oferta: true.
function enOferta(item) {
    return DESCUENTO > 0 && item.oferta === true;
}

// El precio que realmente se paga: el normal menos el descuento (redondeado a colones enteros).
// El carrito (sección 6) usa esta misma función, así que los precios siempre coinciden.
function precioFinal(item) {
    if (!enOferta(item)) return item.precio;
    return Math.round(item.precio * (100 - DESCUENTO) / 100);
}

// Prendas de la galería (index.php). Para agregar una más, copia una línea y cambia sus datos.
//   id     = nombre corto y ÚNICO (el carrito lo usa para reconocer la prenda)
//   tipo   = qué clase de prenda es (se ve en la tarjeta y en el carrito)
//   tallas = las tallas que se pueden elegir
const prendas = [
    { id: "vestido-punk",      tipo: "Vestido",   titulo: "Vestido punk",       descripcion: "Falda asimétrica de tartán, malla y cadenas para destacar de noche.", precio: 34900, oferta: true, tallas: ["XS", "S", "M", "L"],       img: "img/Vestidopunk.jpg",     alt: "Vestido punk negro con falda de cuadros rojos y cadenas" },
    { id: "playera-desgastada", tipo: "Playera",  titulo: "Playera desgastada", descripcion: "Oversize con acabado envejecido y detalles rasgados.",                precio: 18900, oferta: true, tallas: ["S", "M", "L", "XL"],       img: "img/Camisapunk.jpg",      alt: "Playera negra oversize con efecto desgastado y rasgaduras" },
    { id: "pantalon-punk",     tipo: "Pantalón",  titulo: "Pantalón punk",      descripcion: "Pantalón negro con correas, hebillas y parches.",                     precio: 29900, oferta: true, tallas: ["28", "30", "32", "34"],    img: "img/Pantalonpunk.jpg",    alt: "Pantalón negro rasgado con correas y hebillas" },
    { id: "chaqueta-negra",    tipo: "Chaqueta",  titulo: "Chaqueta negra",     descripcion: "Estilo cuero, ideal para los días frescos.",                          precio: 30000, tallas: ["S", "M", "L", "XL"],       img: "img/chaqueta.jpg",        alt: "Chaqueta negra estilo cuero con cierre" },
    { id: "falda-plisada",     tipo: "Falda",     titulo: "Falda plisada",      descripcion: "Plisada con herrajes y correa lateral.",                              precio: 16500, tallas: ["XS", "S", "M", "L"],       img: "img/falda.jpg",           alt: "Falda plisada negra con correa y botones metálicos" },
    { id: "pantalon-cargo",    tipo: "Pantalón",  titulo: "Pantalón cargo",     descripcion: "Holgado, con bolsillos laterales y mucho espacio.",                   precio: 24900, tallas: ["28", "30", "32", "34"],    img: "img/pantalon-hombre.jpg", alt: "Pantalón cargo negro holgado con bolsillos laterales" }
];

// Servicios (servicios.php)
const servicios = [
    { titulo: "Lavandería",             descripcion: "Lavado y secado de sus prendas, con cuidado según la etiqueta.",      precio: 8000,  img: "img/lavanderia.jpg",      alt: "Ícono de una lavadora" },
    { titulo: "Planchado",              descripcion: "Prendas listas para usar, sin arrugas y dobladas.",                   precio: 3000,  img: "img/planchado.jpg",       alt: "Ícono de una plancha con vapor" },
    { titulo: "Tintorería",             descripcion: "Limpieza en seco para abrigos, chaquetas y telas delicadas.",         precio: 10000, img: "img/tintoreria.jpg",      alt: "Ícono de una camisa colgada en un gancho" },
    { titulo: "Servicio express",       descripcion: "Contamos con un servicio express para su comodidad (limitado al GAM).",precio: 3000, img: "img/Express.png",        alt: "Ícono de servicio express" },
    { titulo: "Arreglos y ajustes",     descripcion: "Ruedos, botones, cierres y ajustes a su medida.",                     precio: 6000,  img: "img/arreglos.jpg",        alt: "Ícono de un botón con hilo y aguja" },
    { titulo: "Personalización punk",   descripcion: "Parches, tachas y estampados para hacer su prenda única.",            precio: 12000, img: "img/personalizacion.jpg", alt: "Ícono de un imperdible con tachas" }
];

// Dibuja una tarjeta por cada elemento de la lista dentro del contenedor indicado.
// Si el elemento tiene "tallas" (las prendas) la tarjeta lleva el selector de talla y el botón del carrito;
// si no (los servicios) lleva el botón "Consultar".
function pintarCards(lista, contenedor) {
    if (!contenedor) return;            // si esta página no tiene ese contenedor, no hace nada
    contenedor.innerHTML = "";          // limpiar antes de pintar, para no duplicar tarjetas
    lista.forEach((item) => {
        const art = document.createElement("article");
        art.classList.add("tarjeta");

        const tipo = item.tipo ? `<p class="tipo">${item.tipo}</p>` : "";

        // En oferta: etiqueta "-30%" en la esquina y, en el precio, el valor viejo tachado y el nuevo.
        const etiqueta = enOferta(item) ? `<span class="etiqueta-oferta">-${DESCUENTO}%</span>` : "";
        const precio = enOferta(item)
            ? `<del class="precio-antes">${dinero(item.precio)}</del> ${dinero(precioFinal(item))}`
            : dinero(item.precio);

        let compra = `<a href="contacto.php" class="boton">Consultar</a>`;
        if (item.tallas) {
            const opciones = item.tallas.map((t) => `<option value="${t}">${t}</option>`).join("");
            compra = `
                <div class="compra">
                    <label class="talla">Talla
                        <select class="talla-select">${opciones}</select>
                    </label>
                    <button type="button" class="boton btn-agregar" data-id="${item.id}">Agregar al carrito</button>
                </div>
            `;
        }

        art.innerHTML = `
            ${etiqueta}
            <img src="${item.img}" alt="${item.alt}" loading="lazy">
            ${tipo}
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <p class="precio">${precio}</p>
            ${compra}
        `;
        contenedor.appendChild(art);
    });
}

pintarCards(prendas, document.querySelector("#galeria"));              // solo existe en index.php
pintarCards(servicios, document.querySelector("#lista-servicios"));    // solo existe en servicios.php


/* ---------- 4. CARRUSEL (index.php) ---------- */
const slides = document.querySelectorAll(".slide");
const btnAnterior = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");
const zonaPuntos = document.querySelector("#puntos");
const carrusel = document.querySelector("#carrusel");
const btnPausa = document.querySelector("#pausa");
let actual = 0;
let reloj = null;                       // aquí guardamos el temporizador del cambio automático
let pausado = false;                    // true cuando la persona pulsó el botón de pausa

// Muestra la imagen número i (y marca su puntito)
function mostrar(i) {
    slides.forEach((s) => s.classList.remove("activa"));
    slides[i].classList.add("activa");
    document.querySelectorAll(".punto").forEach((p, n) => {
        p.classList.toggle("activo", n === i);
        p.setAttribute("aria-current", n === i);
    });
}

// El operador % hace que al llegar al final vuelva al principio (y al revés)
function siguiente() { actual = (actual + 1) % slides.length; mostrar(actual); }
function anterior()  { actual = (actual - 1 + slides.length) % slides.length; mostrar(actual); }

function iniciarReloj() {
    detenerReloj();
    if (pausado) return;                    // si está en pausa, no arranca
    reloj = setInterval(siguiente, 5000);   // cada 5 segundos
}
function detenerReloj() { clearInterval(reloj); }

if (slides.length > 0 && btnAnterior && btnSiguiente) {
    btnSiguiente.addEventListener("click", () => { siguiente(); iniciarReloj(); });
    btnAnterior.addEventListener("click", () => { anterior(); iniciarReloj(); });

    // Un puntito por cada imagen
    if (zonaPuntos) {
        slides.forEach((s, n) => {
            const punto = document.createElement("button");
            punto.type = "button";
            punto.classList.add("punto");
            punto.setAttribute("aria-label", "Ir a la imagen " + (n + 1));
            punto.addEventListener("click", () => { actual = n; mostrar(actual); iniciarReloj(); });
            zonaPuntos.appendChild(punto);
        });
        mostrar(actual);
    }

    // Botón de pausa / reanudar (para quien no quiere que las imágenes cambien solas)
    if (btnPausa) {
        btnPausa.addEventListener("click", () => {
            pausado = !pausado;
            btnPausa.classList.toggle("pausado", pausado);
            btnPausa.setAttribute("aria-label", pausado ? "Reanudar carrusel" : "Pausar carrusel");
            iniciarReloj();                 // si quedó pausado, iniciarReloj() no hace nada; si no, vuelve a arrancar
        });
    }

    // Pausa mientras el mouse o el teclado están sobre el carrusel
    if (carrusel) {
        carrusel.addEventListener("mouseenter", detenerReloj);
        carrusel.addEventListener("mouseleave", iniciarReloj);
        carrusel.addEventListener("focusin", detenerReloj);
        carrusel.addEventListener("focusout", iniciarReloj);

        // En el celular: deslizar con el dedo
        let inicioX = 0;
        carrusel.addEventListener("touchstart", (e) => { inicioX = e.changedTouches[0].clientX; }, { passive: true });
        carrusel.addEventListener("touchend", (e) => {
            const diferencia = e.changedTouches[0].clientX - inicioX;
            if (Math.abs(diferencia) > 40) {            // un deslizamiento corto no cuenta
                if (diferencia < 0) siguiente(); else anterior();
                iniciarReloj();
            }
        });
    }

    iniciarReloj();
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
        if (!correo.includes("@") || !correo.includes(".")) errores.push("El correo debe ser válido.");
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


/* ---------- 6. CARRITO DE COMPRAS ---------- */
// El carrito es un arreglo de líneas:  [{ id: "vestido-punk", talla: "M", cantidad: 2 }, ...]
// Cada vez que cambia se guarda en localStorage (para que no se pierda al recargar) y se vuelve a dibujar.
// El PRECIO no se guarda en el carrito: siempre se lee del arreglo "prendas" (así coincide con la galería).
// El HTML está en carrito.php, que se incluye desde footer.php: por eso existe en todas las páginas.
const COSTO_ENVIO = 3000;               // lo que cuesta el envío en compras menores a ENVIO_GRATIS_DESDE
const ENVIO_GRATIS_DESDE = 40000;       // desde este subtotal el envío es gratis

const panelCarrito = document.querySelector("#carrito");
const overlay = document.querySelector("#overlay");
const btnCarrito = document.querySelector("#btnCarrito");
const listaCarrito = document.querySelector("#carritoLista");
const aviso = document.querySelector("#aviso");

const buscarPrenda = (id) => prendas.find((p) => p.id === id);

// Al cargar la página se recupera lo guardado (si no hay nada, el carrito empieza vacío)
let carrito = [];
try {
    const guardado = JSON.parse(localStorage.getItem("dr3x-carrito")) || [];
    // Solo se aceptan líneas válidas: la prenda existe, la talla es una de las suyas y la cantidad es un entero
    carrito = guardado.filter((l) => buscarPrenda(l.id) && buscarPrenda(l.id).tallas.includes(l.talla) && Number.isInteger(l.cantidad) && l.cantidad > 0);
} catch (error) {
    carrito = [];
}

// Unidades, subtotal, ahorro, envío y total
function calcularTotales() {
    let unidades = 0, subtotal = 0, ahorro = 0;
    carrito.forEach((l) => {
        const p = buscarPrenda(l.id);
        unidades += l.cantidad;
        subtotal += precioFinal(p) * l.cantidad;
        ahorro += (p.precio - precioFinal(p)) * l.cantidad;     // lo que se ahorra con la oferta
    });
    const envio = (subtotal === 0 || subtotal >= ENVIO_GRATIS_DESDE) ? 0 : COSTO_ENVIO;
    return { unidades, subtotal, ahorro, envio, total: subtotal + envio };
}

// Guarda el carrito y lo vuelve a dibujar
function actualizar() {
    try {
        localStorage.setItem("dr3x-carrito", JSON.stringify(carrito));
    } catch (error) {
        // sin localStorage el carrito funciona igual, pero no se recuerda al recargar
    }
    pintarCarrito();
}

function pintarCarrito() {
    const t = calcularTotales();

    // Las líneas (una por cada prenda + talla)
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <p><strong>Tu carrito está vacío.</strong></p>
                <p>Agrega alguna prenda desde la galería.</p>
                <a href="index.php#prendas" class="boton" id="verPrendas">Ver prendas</a>
            </div>
        `;
    } else {
        listaCarrito.innerHTML = carrito.map((linea, i) => {
            const p = buscarPrenda(linea.id);
            return `
                <article class="linea" data-i="${i}">
                    <img src="${p.img}" alt="${p.alt}">
                    <div class="linea-info">
                        <h3>${p.titulo}</h3>
                        <p class="linea-tipo">${p.tipo} · Talla ${linea.talla}</p>
                        <p class="linea-unitario">${enOferta(p) ? `<del>${dinero(p.precio)}</del>` : ""}${dinero(precioFinal(p))} c/u</p>
                        <div class="linea-fila">
                            <div class="cantidad" role="group" aria-label="Cantidad de ${p.titulo}">
                                <button type="button" data-accion="menos" aria-label="Quitar una unidad" ${linea.cantidad === 1 ? "disabled" : ""}>&minus;</button>
                                <span>${linea.cantidad}</span>
                                <button type="button" data-accion="mas" aria-label="Agregar una unidad">+</button>
                            </div>
                            <strong class="linea-precio">${dinero(precioFinal(p) * linea.cantidad)}</strong>
                        </div>
                        <button type="button" class="quitar" data-accion="quitar">Quitar</button>
                    </div>
                </article>
            `;
        }).join("");
    }

    // Los números del panel
    document.querySelector("#carritoConteo").textContent = t.unidades > 0 ? "(" + t.unidades + ")" : "";
    document.querySelector("#totalSubtotal").textContent = dinero(t.subtotal);
    document.querySelector("#totalEnvio").textContent = t.subtotal > 0 && t.envio === 0 ? "Gratis" : dinero(t.envio);
    document.querySelector("#totalAhorro").textContent = "−" + dinero(t.ahorro);
    document.querySelector("#filaAhorro").classList.toggle("oculto", t.ahorro === 0);   // solo se ve si hay ahorro
    document.querySelector("#totalFinal").textContent = dinero(t.total);

    // Barra de "envío gratis"
    const barra = document.querySelector("#envioBarra");
    barra.max = ENVIO_GRATIS_DESDE;
    barra.value = Math.min(t.subtotal, ENVIO_GRATIS_DESDE);
    document.querySelector("#envioMensaje").textContent = t.subtotal >= ENVIO_GRATIS_DESDE
        ? "¡Tienes envío gratis!"
        : "Te faltan " + dinero(ENVIO_GRATIS_DESDE - t.subtotal) + " para el envío gratis.";

    // El numerito rojo y el total que se ven en el encabezado
    document.querySelector("#contadorCarrito").textContent = t.unidades;
    document.querySelector("#contadorCarrito").classList.toggle("vacio", t.unidades === 0);
    document.querySelector("#miniTotal").textContent = dinero(t.subtotal);

    document.querySelector("#btnPagar").disabled = carrito.length === 0;                         // sin productos no se puede pagar
    document.querySelector("#btnVaciar").classList.toggle("oculto", carrito.length === 0);
}

// Cartelito que aparece abajo unos segundos
let temporizador;
function avisar(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(temporizador);
    temporizador = setTimeout(() => aviso.classList.remove("visible"), 2400);
}

// Abrir y cerrar el panel del carrito
function abrirCarrito() {
    aviso.classList.remove("visible");              // el cartelito no tapa el panel
    panelCarrito.classList.add("abierto");
    overlay.classList.add("abierto");
    document.body.classList.add("sin-scroll");      // que la página de atrás no se mueva
    btnCarrito.setAttribute("aria-expanded", "true");
    document.querySelector("#cerrarCarrito").focus();
}

function cerrarCarrito() {
    panelCarrito.classList.remove("abierto");
    overlay.classList.remove("abierto");
    document.body.classList.remove("sin-scroll");
    btnCarrito.setAttribute("aria-expanded", "false");
}

btnCarrito.addEventListener("click", abrirCarrito);
document.querySelector("#cerrarCarrito").addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);
document.querySelector("#btnVaciar").addEventListener("click", () => {
    carrito = [];
    actualizar();
    avisar("Carrito vaciado");
});

// Botones +, − y Quitar de cada línea. Un solo "oyente" en la lista sirve para todos (delegación de eventos).
listaCarrito.addEventListener("click", (e) => {
    if (e.target.closest("#verPrendas")) cerrarCarrito();       // el enlace del carrito vacío

    const boton = e.target.closest("[data-accion]");
    if (!boton) return;
    const i = Number(boton.closest(".linea").dataset.i);        // la posición de la línea en el arreglo

    if (boton.dataset.accion === "mas") carrito[i].cantidad++;
    if (boton.dataset.accion === "menos") carrito[i].cantidad--;
    if (boton.dataset.accion === "quitar") carrito.splice(i, 1);
    actualizar();
});

// Botón "Agregar al carrito" de las tarjetas. Las tarjetas se dibujan con JavaScript (sección 3),
// por eso se escucha en todo el documento y se busca el botón que recibió el clic.
document.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-agregar");
    if (!boton) return;

    const prenda = buscarPrenda(boton.dataset.id);
    const talla = boton.closest(".tarjeta").querySelector(".talla-select").value;

    // ¿Ya hay esa misma prenda en esa misma talla? Entonces solo sube la cantidad
    const existente = carrito.find((l) => l.id === prenda.id && l.talla === talla);
    if (existente) existente.cantidad++;
    else carrito.push({ id: prenda.id, talla: talla, cantidad: 1 });

    actualizar();
    avisar(prenda.titulo + " (talla " + talla + ") agregado al carrito");
});

pintarCarrito();


/* ---------- 7. PAGO SIMULADO ---------- */
// No cobra nada ni envía ningún dato: valida los campos, espera unos segundos y muestra "pedido confirmado".
const modalPago = document.querySelector("#modalPago");
const formPago = document.querySelector("#formPago");
const mensajesPago = document.querySelector("#mensajesPago");
const nombresMetodo = { tarjeta: "Tarjeta", sinpe: "SINPE Móvil", contraentrega: "Contra entrega" };
let procesando = false;                 // mientras es true no se puede cerrar la ventana

// Muestra solo uno de los 3 pasos: el formulario, "procesando" o "confirmado"
function mostrarPaso(cual) {
    ["formPago", "pasoProcesando", "pasoExito"].forEach((id) => {
        document.querySelector("#" + id).classList.toggle("oculto", id !== cual);
    });
}

// Muestra solo el panel del método elegido (tarjeta, SINPE o contra entrega)
formPago.addEventListener("change", () => {
    document.querySelectorAll(".panel-pago").forEach((panel) => {
        panel.classList.toggle("activo", panel.dataset.metodo === formPago.metodo.value);
    });
});

function abrirPago() {
    const t = calcularTotales();
    formPago.reset();                           // campos vacíos cada vez que se abre
    formPago.dispatchEvent(new Event("change"));   // y vuelve a mostrarse el panel de tarjeta
    mensajesPago.textContent = "";
    mostrarPaso("formPago");
    document.querySelector("#pagoTotal").textContent = dinero(t.total);
    document.querySelector("#pagoUnidades").textContent = "(" + t.unidades + (t.unidades === 1 ? " producto" : " productos") + ")";

    cerrarCarrito();                            // se cierra el panel del carrito...
    aviso.classList.remove("visible");
    modalPago.classList.add("abierto");         // ...y se abre la ventana de pago
    document.body.classList.add("sin-scroll");
    formPago.nombre.focus();
}

function cerrarPago() {
    if (procesando) return;
    modalPago.classList.remove("abierto");
    document.body.classList.remove("sin-scroll");
}

document.querySelector("#btnPagar").addEventListener("click", abrirPago);
document.querySelector("#cerrarPago").addEventListener("click", cerrarPago);
document.querySelector("#btnSeguir").addEventListener("click", cerrarPago);
modalPago.addEventListener("click", (e) => { if (e.target === modalPago) cerrarPago(); });   // clic en el fondo oscuro

// La tecla Escape cierra lo que esté abierto
document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (modalPago.classList.contains("abierto")) cerrarPago();
    else cerrarCarrito();
});

// Mientras se escribe, la tarjeta y la fecha se acomodan solas
formPago.tarjeta.addEventListener("input", () => {
    const digitos = formPago.tarjeta.value.replace(/\D/g, "").slice(0, 16);      // \D = todo lo que NO es número; slice = máximo 16 dígitos
    formPago.tarjeta.value = digitos.replace(/(.{4})/g, "$1 ").trim();           // un espacio cada 4 números
});
formPago.vence.addEventListener("input", () => {
    const digitos = formPago.vence.value.replace(/\D/g, "").slice(0, 4);         // máximo 4 dígitos: MMAA
    formPago.vence.value = digitos.length > 2 ? digitos.slice(0, 2) + "/" + digitos.slice(2) : digitos;   // pone la barra sola
});

// Al enviar: se validan los campos (igual que el formulario de contacto) y se simula el pago
formPago.addEventListener("submit", (e) => {
    e.preventDefault();                         // este formulario NUNCA se envía a ningún servidor
    const metodo = formPago.metodo.value;
    const errores = [];

    if (formPago.nombre.value.trim() === "") errores.push("Escriba su nombre.");
    // El correo no se usa para nada (es una práctica): solo se revisa que tenga @
    if (!formPago.correo.value.includes("@")) errores.push("El correo debe tener @ (por ejemplo ana@correo.com).");

    if (metodo === "tarjeta") {
        if (!/^\d{16}$/.test(formPago.tarjeta.value.replaceAll(" ", ""))) errores.push("El número de tarjeta debe tener 16 dígitos.");
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formPago.vence.value)) errores.push("La fecha debe tener el formato MM/AA.");
        if (!/^\d{3,4}$/.test(formPago.cvv.value)) errores.push("El CVV debe tener 3 o 4 dígitos.");
    }
    if (metodo === "sinpe" && !/^\d{8}$/.test(formPago.telefono.value)) errores.push("El teléfono debe tener 8 dígitos.");
    if (metodo === "contraentrega" && formPago.direccion.value.trim() === "") errores.push("Escriba la dirección de entrega.");

    mensajesPago.textContent = errores.join(" ");
    if (errores.length > 0) return;

    // Todo bien: "procesamos" el pago (es solo una espera de unos segundos)
    procesando = true;
    mostrarPaso("pasoProcesando");
    setTimeout(() => finalizarPedido(metodo), 2500);
});

// Muestra el "recibo" y vacía el carrito
function finalizarPedido(metodo) {
    const t = calcularTotales();
    const lineas = carrito.map((l) => {
        const p = buscarPrenda(l.id);
        return `<li>${l.cantidad} × ${p.titulo} (${p.tipo}, talla ${l.talla}) — ${dinero(precioFinal(p) * l.cantidad)}</li>`;
    });
    if (t.envio > 0) lineas.push(`<li>Envío — ${dinero(t.envio)}</li>`);

    document.querySelector("#exitoLista").innerHTML = lineas.join("");
    document.querySelector("#exitoNumero").textContent = "DR3X-" + Math.floor(100000 + Math.random() * 900000);
    document.querySelector("#exitoCorreo").textContent = "Recibo para: " + formPago.correo.value.trim();
    document.querySelector("#exitoTotal").textContent = dinero(t.total);
    document.querySelector("#exitoMetodo").textContent = "Método de pago: " + nombresMetodo[metodo] + ".";

    carrito = [];                               // el carrito queda en cero
    actualizar();
    procesando = false;
    mostrarPaso("pasoExito");
}
