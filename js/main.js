//Listas de menú
//Hamburguesa
const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");

btnMenu.addEventListener("click", () => { //Agrega la x o rayillas en moviles
    menu.classList.toggle("abierto");          
    btnMenu.classList.toggle("activo");
});

document.querySelectorAll("#menu a").forEach(enlace => { //Cerrar menú
    enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        btnMenu.classList.remove("activo");
    });
});

//Menú accordion (preguntas frecuentes)
const titulos = document.querySelectorAll(".accordion .titulo");

titulos.forEach(titulo => {
    titulo.addEventListener("click", () => {
        const item = titulo.parentElement; //Item
        document.querySelectorAll(".accordion .item").forEach(otro => { //Cierra menú cuando otro se abre
            if (otro !== item) otro.classList.remove("activo");
        });
        item.classList.toggle("activo");
    });
});

// Cards del index con su respectivo valor
const MONEDA = "₡"; //colones xd
const DESCUENTO = 30; //Descuento de prendas seleccionadas 
function dinero(numero) { //Dinero
    return MONEDA + numero.toLocaleString("es-CR");
}
function enOferta(item) { //Prendas con valor true son las seleccionadas para la oferta
    return DESCUENTO > 0 && item.oferta === true;
}
function precioFinal(item) { //Logica matematica, no sé como se diga 
    if (enOferta(item)) {
        return Math.round(item.precio * (100 - DESCUENTO) / 100);
    }
    return item.precio;
}
//Prendas, id, y sus decripciones y valores (para el darien del futuro, true, son las seleccionadas con descuento)
const prendas = [
    { id: "vestido-punk",       tipo: "Vestido",  titulo: "Vestido punk",       descripcion: "Falda asimétrica de tartán, malla y cadenas para destacar de noche.", precio: 34900, oferta: true, tallas: ["XS", "S", "M", "L"],    img: "img/Vestidopunk.jpg",     alt: "Vestido punk negro con falda de cuadros rojos y cadenas" },
    { id: "playera-desgastada", tipo: "Playera",  titulo: "Playera desgastada", descripcion: "Oversize con acabado envejecido y detalles rasgados.",                precio: 18900, oferta: true, tallas: ["S", "M", "L", "XL"],    img: "img/Camisapunk.jpg",      alt: "Playera negra oversize con efecto desgastado y rasgaduras" },
    { id: "pantalon-punk",      tipo: "Pantalón", titulo: "Pantalón punk",      descripcion: "Pantalón negro con correas, hebillas y parches.",                     precio: 29900, oferta: true, tallas: ["28", "30", "32", "34"], img: "img/Pantalonpunk.jpg",    alt: "Pantalón negro rasgado con correas y hebillas" },
    { id: "chaqueta-negra",     tipo: "Chaqueta", titulo: "Chaqueta negra",     descripcion: "Estilo cuero, ideal para los días frescos.",                          precio: 30000, tallas: ["S", "M", "L", "XL"],                       img: "img/chaqueta.jpg",        alt: "Chaqueta negra estilo cuero con cierre" },
    { id: "falda-plisada",      tipo: "Falda",    titulo: "Falda plisada",      descripcion: "Plisada con herrajes y correa lateral.",                              precio: 16500, tallas: ["XS", "S", "M", "L"],                       img: "img/falda.jpg",           alt: "Falda plisada negra con correa y botones metálicos" },
    { id: "pantalon-cargo",     tipo: "Pantalón", titulo: "Pantalón cargo",     descripcion: "Holgado, con bolsillos laterales y mucho espacio.",                   precio: 24900, tallas: ["28", "30", "32", "34"],                    img: "img/pantalon-hombre.jpg", alt: "Pantalón cargo negro holgado con bolsillos laterales" }
];

// Servicios y sus costos
const servicios = [
    { titulo: "Lavandería",           descripcion: "Lavado y secado de sus prendas, con cuidado según la etiqueta.",       precio: 8000,  img: "img/lavanderia.jpg",      alt: "Ícono de una lavadora" },
    { titulo: "Planchado",            descripcion: "Prendas listas para usar, sin arrugas y dobladas.",                    precio: 3000,  img: "img/planchado.jpg",       alt: "Ícono de una plancha con vapor" },
    { titulo: "Tintorería",           descripcion: "Limpieza en seco para abrigos, chaquetas y telas delicadas.",          precio: 10000, img: "img/tintoreria.jpg",      alt: "Ícono de una camisa colgada en un gancho" },
    { titulo: "Servicio express",     descripcion: "Contamos con un servicio express para su comodidad (limitado al GAM).", precio: 3000, img: "img/Express.png",         alt: "Ícono de servicio express" },
    { titulo: "Arreglos y ajustes",   descripcion: "Ruedos, botones, cierres y ajustes a su medida.",                      precio: 6000,  img: "img/arreglos.jpg",        alt: "Ícono de un botón con hilo y aguja" },
    { titulo: "Personalización punk", descripcion: "Parches, tachas y estampados para hacer su prenda única.",             precio: 12000, img: "img/personalizacion.jpg", alt: "Ícono de un imperdible con tachas" }
];

// Dibuja una tarjeta por cada elemento de la lista dentro del contenedor.
// Las prendas llevan el selector de talla y el botón del carrito;
// los servicios llevan el botón "Consultar".
function pintarCards(lista, contenedor) {
    contenedor.innerHTML = ""; // limpiar antes de dibujar, para no duplicar tarjetas
    lista.forEach(item => {
        const art = document.createElement("article");
        art.classList.add("tarjeta");

        // En oferta: etiqueta "-30%" en la esquina y, en el precio, el valor viejo tachado y el nuevo
        let etiqueta = "";
        let precio = dinero(item.precio);
        if (enOferta(item)) {
            etiqueta = `<span class="etiqueta-oferta">-${DESCUENTO}%</span>`;
            precio = `<del class="precio-antes">${dinero(item.precio)}</del> ${dinero(precioFinal(item))}`;
        }

        let tipo = "";
        if (item.tipo) {
            tipo = `<p class="tipo">${item.tipo}</p>`;
        }

        let compra = `<a href="contacto.php" class="boton">Consultar</a>`;
        if (item.tallas) {
            let opciones = "";
            item.tallas.forEach(talla => {
                opciones += `<option value="${talla}">${talla}</option>`;
            });
            compra = `
                <div class="compra">
                    <label class="talla">Talla
                        <select class="talla-select">${opciones}</select>
                    </label>
                    <button type="button" class="boton btn-agregar">Agregar al carrito</button>
                </div>`;
        }

        art.innerHTML = `
            ${etiqueta}
            <img src="${item.img}" alt="${item.alt}" loading="lazy">
            ${tipo}
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <p class="precio">${precio}</p>
            ${compra}`;
        contenedor.appendChild(art);

        if (item.tallas) {  // El botón agregar 
            const boton = art.querySelector(".btn-agregar");
            const talla = art.querySelector(".talla-select");
            boton.addEventListener("click", () => {
                agregar(item.id, talla.value);
            });
        }
    });
}

const galeria = document.querySelector("#galeria"); // solo existe en index.php
const listaServicios = document.querySelector("#lista-servicios"); // solo existe en servicios.php

if (galeria) pintarCards(prendas, galeria);
if (listaServicios) pintarCards(servicios, listaServicios);

/* Carrusel*/
const slides = document.querySelectorAll(".slide");
const zonaPuntos = document.querySelector("#puntos");
const btnPausa = document.querySelector("#pausa");
let actual = 0;
let reloj = null; // aquí se guarda el temporizador que cambia las imagenes
let pausado = false; // true cuando se pulsó el botón de pausa

function mostrar(i) { // Muestra la imagen número i y marca su puntito
    slides.forEach(s => s.classList.remove("activa"));
    slides[i].classList.add("activa");

    const puntos = document.querySelectorAll(".punto");
    puntos.forEach(p => p.classList.remove("activo"));
    puntos[i].classList.add("activo");
}

function siguiente() { // El % (residuo) hace que después de la última imagen se vuelva a la primera, y al revés
    actual = (actual + 1) % slides.length;
    mostrar(actual);
}

function anterior() {
    actual = (actual - 1 + slides.length) % slides.length;
    mostrar(actual);
}

function iniciarReloj() { // Cambia de imagen sola cada 5 segundos. Se reinicia con cada clic.
    clearInterval(reloj);
    if (pausado === false) {
        reloj = setInterval(siguiente, 5000); //tiempo en totaalll
    }
}

if (slides.length > 0) {
    slides.forEach((s, n) => { // Un puntito por cada imagen, los que estan abajo
        const punto = document.createElement("button");
        punto.type = "button";
        punto.classList.add("punto");
        punto.title = "Ir a la imagen " + (n + 1);
        punto.addEventListener("click", () => {
            actual = n;
            mostrar(actual);
            iniciarReloj();
        });
        zonaPuntos.appendChild(punto);
    });
    mostrar(actual);

    document.querySelector("#siguiente").addEventListener("click", () => {
        siguiente();
        iniciarReloj();
    });

    document.querySelector("#anterior").addEventListener("click", () => {
        anterior();
        iniciarReloj();
    });

    btnPausa.addEventListener("click", () => { // Botón de pausa y reanudar
        pausado = !pausado; // si era false pasa a true, y al revés
        btnPausa.classList.toggle("pausado"); // cambia el ícono (el CSS decide cuál se ve)
        iniciarReloj();
    });

    iniciarReloj();
}

/* Validacion contacto (contacto.php)*/
const form = document.querySelector("#formulario");

if (form) {
    form.addEventListener("submit", (e) => {
        const nombre = form.nombre.value.trim(); //trim() quita espacios al inicio y al final
        const correo = form.correo.value.trim(); //correo igual que el name del input
        const mensaje = form.mensaje.value.trim();
        let errores = [];

        if (nombre === "") errores.push("El nombre es obligatorio.");
        if (!correo.includes("@") || !correo.includes(".")) errores.push("El correo debe ser válido.");
        if (mensaje === "") errores.push("El mensaje es obligatorio.");

        const zonaMensajes = document.querySelector("#mensajes");

        if (errores.length > 0) {
            e.preventDefault();// frena el envío del formulario
            zonaMensajes.textContent = errores.join(" ");
        } else {
            zonaMensajes.textContent = ""; // todo bien: se limpia y el formulario se envía
        }
    });
}

/*Carrito de compras, El PRECIO no se guarda en el carrito: siempre se busca en el arreglo prendas*/
// El HTML del carrito está en carrito.php, que footer.php incluye en todas las páginas.
const COSTO_ENVIO = 3000; // lo que cuesta el envío en compras menores a envio gratis
const ENVIO_GRATIS_DESDE = 40000; // desde este subtotal el envío es gratis
const panelCarrito = document.querySelector("#carrito");
const overlay = document.querySelector("#overlay");
const btnCarrito = document.querySelector("#btnCarrito");
const listaCarrito = document.querySelector("#carritoLista");
const btnPagar = document.querySelector("#btnPagar");
const btnVaciar = document.querySelector("#btnVaciar");
const aviso = document.querySelector("#aviso");

let carrito = JSON.parse(localStorage.getItem("dr3x-carrito")) || []; // Lo que había guardado en el navegador

function buscarPrenda(id) { // Busca una prenda por su id en el arreglo "prendas"
    for (let i = 0; i < prendas.length; i++) {
        if (prendas[i].id === id) return prendas[i];
    }
}

function agregar(id, talla) { // Agrega una prenda (con su talla) al carrito
    let existe = false;// ¿Ya hay esa misma prenda en esa misma talla? Entonces solo sube la cantidad
    carrito.forEach(linea => {
        if (linea.id === id && linea.talla === talla) {
            linea.cantidad++;
            existe = true;
        }
    });
    if (existe === false) {
        carrito.push({ id: id, talla: talla, cantidad: 1 });
    }

    actualizar();
    avisar(buscarPrenda(id).titulo + " (talla " + talla + ") agregado al carrito");
}

// Calcula unidades, subtotal, ahorro, envío y total
function calcularTotales() {
    let unidades = 0;
    let subtotal = 0;
    let ahorro = 0; // cuánto se ahorra con la oferta
    carrito.forEach(linea => {
        const p = buscarPrenda(linea.id);
        unidades += linea.cantidad;
        subtotal += precioFinal(p) * linea.cantidad;
        ahorro += (p.precio - precioFinal(p)) * linea.cantidad;
    });

    let envio = COSTO_ENVIO;
    if (subtotal === 0 || subtotal >= ENVIO_GRATIS_DESDE) envio = 0;

    return { unidades: unidades, subtotal: subtotal, ahorro: ahorro, envio: envio, total: subtotal + envio };
}
function actualizar() {//Guarda el carrito y lo vuelve a dibujar
    localStorage.setItem("dr3x-carrito", JSON.stringify(carrito));
    pintarCarrito();
}

function pintarCarrito() {
    const t = calcularTotales();

    // Las líneas del carrito (una por cada prenda + talla)
    listaCarrito.innerHTML = ""; // limpiar antes de dibujar
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <p><strong>Tu carrito está vacío.</strong></p>
                <p>Agrega alguna prenda desde la galería.</p>
                <a href="index.php#prendas" class="boton" id="verPrendas">Ver prendas</a>
            </div>`;
        document.querySelector("#verPrendas").addEventListener("click", cerrarCarrito);
    }

    carrito.forEach((linea, i) => {
        const p = buscarPrenda(linea.id);

        let precioAntes = "";
        if (enOferta(p)) precioAntes = `<del>${dinero(p.precio)}</del>`;

        let desactivado = "";// con 1 unidad el botón − no se puede usar
        if (linea.cantidad === 1) desactivado = "disabled";

        const art = document.createElement("article");
        art.classList.add("linea");
        art.innerHTML = `
            <img src="${p.img}" alt="${p.alt}">
            <div class="linea-info">
                <h3>${p.titulo}</h3>
                <p class="linea-tipo">${p.tipo} · Talla ${linea.talla}</p>
                <p class="linea-unitario">${precioAntes}${dinero(precioFinal(p))} c/u</p>
                <div class="linea-fila">
                    <div class="cantidad">
                        <button type="button" class="menos" aria-label="Quitar una unidad" ${desactivado}>&minus;</button>
                        <span>${linea.cantidad}</span>
                        <button type="button" class="mas" aria-label="Agregar una unidad">+</button>
                    </div>
                    <strong class="linea-precio">${dinero(precioFinal(p) * linea.cantidad)}</strong>
                </div>
                <button type="button" class="quitar">Quitar</button>
            </div>`;
        listaCarrito.appendChild(art);

        art.querySelector(".mas").addEventListener("click", () => {// funciones de clics se programan aquí
            linea.cantidad++;
            actualizar();
        });
        art.querySelector(".menos").addEventListener("click", () => {
            linea.cantidad--;
            actualizar();
        });
        art.querySelector(".quitar").addEventListener("click", () => {
            carrito.splice(i, 1); // borra 1 elemento, el de la posición i
            actualizar();
        });
    });

    const conteo = document.querySelector("#carritoConteo"); // Los números del panel
    conteo.textContent = "";
    if (t.unidades > 0) conteo.textContent = "(" + t.unidades + ")";

    document.querySelector("#totalSubtotal").textContent = dinero(t.subtotal);

    const textoEnvio = document.querySelector("#totalEnvio");
    textoEnvio.textContent = dinero(t.envio);
    if (t.subtotal > 0 && t.envio === 0) textoEnvio.textContent = "Gratis";

    document.querySelector("#totalAhorro").textContent = "−" + dinero(t.ahorro);
    const filaAhorro = document.querySelector("#filaAhorro");
    filaAhorro.classList.add("oculto");
    if (t.ahorro > 0) filaAhorro.classList.remove("oculto");// solo se ve si hay ahorro

    document.querySelector("#totalFinal").textContent = dinero(t.total);

    const barra = document.querySelector("#envioBarra");  // Barra de "envío gratis"
    barra.max = ENVIO_GRATIS_DESDE;
    barra.value = t.subtotal;
    const mensajeEnvio = document.querySelector("#envioMensaje");
    if (t.subtotal >= ENVIO_GRATIS_DESDE) {
        mensajeEnvio.textContent = "¡Tienes envío gratis!";
    } else {
        mensajeEnvio.textContent = "Te faltan " + dinero(ENVIO_GRATIS_DESDE - t.subtotal) + " para el envío gratis.";
    }

    const contador = document.querySelector("#contadorCarrito"); // El numerito rojo y el total que se ven en el encabezado
    contador.textContent = t.unidades;
    contador.classList.remove("vacio");
    if (t.unidades === 0) contador.classList.add("vacio");
    document.querySelector("#miniTotal").textContent = dinero(t.subtotal);

    if (carrito.length === 0) {// Sin productos no se puede pagar ni vaciar
        btnPagar.disabled = true;
        btnVaciar.classList.add("oculto");
    } else {
        btnPagar.disabled = false;
        btnVaciar.classList.remove("oculto");
    }
}

let temporizador = null; // Cartelito que aparece abajo unos segundos
function avisar(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        aviso.classList.remove("visible");
    }, 2400);
}

function abrirCarrito() { // Abrir y cerrar el panel del carrito (solo agregan y quitan clases, el CSS hace el resto)
    aviso.classList.remove("visible");// el cartelito no tapa el panel
    panelCarrito.classList.add("abierto");
    overlay.classList.add("abierto");
    document.body.classList.add("sin-scroll"); //Para que la página de atrás no se mueva
}

function cerrarCarrito() {
    panelCarrito.classList.remove("abierto");
    overlay.classList.remove("abierto");
    document.body.classList.remove("sin-scroll");
}

btnCarrito.addEventListener("click", abrirCarrito);
document.querySelector("#cerrarCarrito").addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);

btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizar();
    avisar("Carrito vaciado");
});

pintarCarrito();

const modalPago = document.querySelector("#modalPago"); //Menu de pago y carrito, claramente no funcionará
const formPago = document.querySelector("#formPago");
const mensajesPago = document.querySelector("#mensajesPago");
let procesando = false; // mientras es true no se puede cerrar la ventana

function soloNumeros(texto) { // Devuelve el texto sin letras ni símbolos, solo los números.
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] >= "0" && texto[i] <= "9") resultado += texto[i];
    }
    return resultado;
}

function mostrarPaso(cual) { // Muestra solo uno de los 3 pasos: el formulario, "procesando" o "confirmado"
    document.querySelector("#formPago").classList.add("oculto");
    document.querySelector("#pasoProcesando").classList.add("oculto");
    document.querySelector("#pasoExito").classList.add("oculto");
    document.querySelector("#" + cual).classList.remove("oculto");
}

function mostrarPanelPago() { // Muestra solo los campos del método elegido (tarjeta, SINPE o contra entrega)
    document.querySelectorAll(".panel-pago").forEach(panel => panel.classList.remove("activo"));
    document.querySelector("#panel-" + formPago.metodo.value).classList.add("activo");
}
formPago.addEventListener("change", mostrarPanelPago);

function abrirPago() {
    const t = calcularTotales();
    formPago.reset(); // campos vacíos cada vez que se abre
    mostrarPanelPago();
    mensajesPago.textContent = "";
    mostrarPaso("formPago");

    let palabra = " productos";
    if (t.unidades === 1) palabra = " producto";
    document.querySelector("#pagoTotal").textContent = dinero(t.total);
    document.querySelector("#pagoUnidades").textContent = "(" + t.unidades + palabra + ")";

    cerrarCarrito();//se cierra el panel del carrito
    aviso.classList.remove("visible");
    modalPago.classList.add("abierto");//y se abre la ventana de pago
    document.body.classList.add("sin-scroll");
}

function cerrarPago() {
    if (procesando === false) {
        modalPago.classList.remove("abierto");
        document.body.classList.remove("sin-scroll");
    }
}

btnPagar.addEventListener("click", abrirPago);
document.querySelector("#cerrarPago").addEventListener("click", cerrarPago);
document.querySelector("#btnSeguir").addEventListener("click", cerrarPago);
modalPago.addEventListener("click", (e) => {
    if (e.target === modalPago) cerrarPago();   // clic en el fondo oscuro
});

document.addEventListener("keydown", (e) => {// La tecla Escape cierra lo que esté abierto
    if (e.key === "Escape") {
        if (modalPago.classList.contains("abierto")) cerrarPago();
        else cerrarCarrito();
    }
});

formPago.tarjeta.addEventListener("input", () => { // Mientras se escribe, la tarjeta y la fecha se acomodan solas
    const digitos = soloNumeros(formPago.tarjeta.value).slice(0, 16);// máximo 16 números
    let texto = "";
    for (let i = 0; i < digitos.length; i++) {
        if (i > 0 && i % 4 === 0) texto += " "; // un espacio cada 4 números
        texto += digitos[i];
    }
    formPago.tarjeta.value = texto;
});

formPago.vence.addEventListener("input", () => {
    const digitos = soloNumeros(formPago.vence.value).slice(0, 4);// máximo 4 números: MMAA
    if (digitos.length > 2) {
        formPago.vence.value = digitos.slice(0, 2) + "/" + digitos.slice(2); // pone la barra sola
    } else {
        formPago.vence.value = digitos;
    }
});

formPago.addEventListener("submit", (e) => { // Al enviar: se validan los campos y se simula el pago
    e.preventDefault(); // este formulario no sirve en realidad xd
    const metodo = formPago.metodo.value;
    let errores = [];

    if (formPago.nombre.value.trim() === "") errores.push("Escriba su nombre.");
    if (!formPago.correo.value.includes("@")) errores.push("El correo debe tener @ (por ejemplo ana@correo.com)."); //se busca el @

    if (metodo === "tarjeta") {
        const fecha = formPago.vence.value;
        const mes = Number(fecha.slice(0, 2));
        const cvv = formPago.cvv.value;
        if (soloNumeros(formPago.tarjeta.value).length !== 16) errores.push("El número de tarjeta debe tener 16 dígitos.");
        if (fecha.length !== 5 || mes < 1 || mes > 12) errores.push("La fecha debe tener el formato MM/AA.");
        if (soloNumeros(cvv) !== cvv || cvv.length < 3) errores.push("El CVV debe tener 3 o 4 dígitos.");
    }
    if (metodo === "sinpe") {
        const telefono = formPago.telefono.value;
        if (soloNumeros(telefono) !== telefono || telefono.length !== 8) errores.push("El teléfono debe tener 8 dígitos.");
    }
    if (metodo === "contraentrega") {
        if (formPago.direccion.value.trim() === "") errores.push("Escriba la dirección de entrega.");
    }

    if (errores.length > 0) {
        mensajesPago.textContent = errores.join(" ");
    } else { // Todo bien: "procesamos" el pago (es solo una espera de unos segundos)
        procesando = true;
        mostrarPaso("pasoProcesando");
        setTimeout(() => {
            finalizarPedido(metodo);
        }, 2500);
    }
});

function finalizarPedido(metodo) { // Muestra el "recibo" y vacía el carrito
    const t = calcularTotales();

    const lista = document.querySelector("#exitoLista");
    lista.innerHTML = "";
    carrito.forEach(linea => {
        const p = buscarPrenda(linea.id);
        const li = document.createElement("li");
        li.textContent = linea.cantidad + " × " + p.titulo + " (" + p.tipo + ", talla " + linea.talla + ") — " + dinero(precioFinal(p) * linea.cantidad);
        lista.appendChild(li);
    });
    if (t.envio > 0) {
        const li = document.createElement("li");
        li.textContent = "Envío — " + dinero(t.envio);
        lista.appendChild(li);
    }

    let nombreMetodo = "Tarjeta";
    if (metodo === "sinpe") nombreMetodo = "SINPE Móvil";
    if (metodo === "contraentrega") nombreMetodo = "Contra entrega";

    const numero = Math.floor(100000 + Math.random() * 900000);// número de pedido al azar
    document.querySelector("#exitoNumero").textContent = "DR3X-" + numero;
    document.querySelector("#exitoCorreo").textContent = "Recibo para: " + formPago.correo.value.trim();
    document.querySelector("#exitoTotal").textContent = dinero(t.total);
    document.querySelector("#exitoMetodo").textContent = "Método de pago: " + nombreMetodo + ".";

    carrito = []; // el carrito queda en cero
    actualizar();
    procesando = false;
    mostrarPaso("pasoExito");
}
