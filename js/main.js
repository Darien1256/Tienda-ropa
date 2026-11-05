const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
const titulo = document.querySelector(".acordion .titulo");

btnMenu.addEventListener("click", () => {
    menu.classList.toggle("abierto");
    btnMenu.classList.toggle("activo");
});

// Cerrar el menú al hacer clic en un enlace

document.querySelectorAll(".menu a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        btnMenu.classList.remove("activo");
    });
});

//arcodeón

titulo.forEach((titulo) => {
    
        titulo.addEventListener("click", () => { 
        const item=titulo.parentElement;

           document.querySelectorAll(".acordion .item").forEach((otro) => {
            if (otro !== item) otro.classList.remove("activo"); 
        });
                item.classList.toggle("activo");
            });
});

//arreglo de objetos

const servicios = [
    {titulo: "lavado", precio:8000, img:"img/camiseta.jpg"},
    {titulo: "planchado", precio:5000, img:"img/camiseta.jpg"},
    {titulo: "tintoreria", precio:10000, img:"img/camiseta.jpg"},
];
    
const contenedor= document.querySelector("#cards");

function pintarCards(lista){
    contenedor.innerHTML="";
    lista.forEach(s => {
        const art =document.createElement("article");
        art.classList.add("tarjeta");
        art.innerHTML=`
        <img src="${s.img}" alt="${s.titulo}">
        <h3>${s.titulo}</h3>
        <p>Precio: $${s.precio}</p>
        `;
        contenedor.appendChild(art);
    });
}

if (contenedor) pintarCards(servicios);

const slides = document.querySelectorAll(".slide");
let actual = 0;
function mostrar(i) {
    slides.forEach(s => s.classList.remove("activa"));
    slides[i].classList.add("activa"); 
}

if (slides.length > 0) {
    document.querySelector("#siguiente").addEventListener("click", () => {
        actual=(actual + 1) % slides.length;
        mostrar(actual);
    });
    document.querySelector("#anterior").addEventListener("click", () => { 
        actual=(actual - 1 + slides.length) % slides.length;
        mostrar(actual);
    });
}   

//validación de formulario
const form=document.querySelector("#formulario");

if (form) {
    form.addEventListener("submit", (e) => {
        const nombre=form.nombre.value.trim();s
        const correo=form.email.value.trim();
        let errores= [];

        if (nombre === "") errores.push("El nombre es obligatorio");
        if (!correo.includes("@")) errores.push("El correo debe ser válido");

        if (errores.length > 0) {
            e.preventDefault();
            document.querySelector("#mensajes").textContent=errores.join(" ");

        }
    });
}

