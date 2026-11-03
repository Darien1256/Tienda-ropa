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

titulos.forEach((titulo) => {
    titulo.addEventListener("click", () => { 
        const item=titulo.parentElement;

        document.querySelectorAll(".acordion .item").forEach((otro) => {
            if (otro !== item) otro.classList.remove("activo"); 
        });
                item.classList.toggle("activo");
            });
{);
        
    

    


    
                

