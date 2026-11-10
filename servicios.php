<?php $titulo = "Servicios | DR3X"; include "header.php"; ?>

    <main>
        <section class="intro contenedor">
            <h1>Servicios</h1>
            <p>En DR3X le ofrecemos todo lo que necesita para renovar y cuidar su guardarropa: desde lavandería y tintorería hasta asesoría de imagen.</p>
        </section>

        <section class="cuidado contenedor">
            <h2>Cuidado y asesoría</h2>
            <!-- Estas tarjetas las dibuja JavaScript desde el arreglo "servicios" de js/main.js -->
            <div class="cards cards-servicios" id="lista-servicios"></div>
        </section>

        <section class="dama contenedor">
            <h2>Ropa para dama</h2>
            <ul>
                <li>Blusas y camisas</li>
                <li>Vestidos y faldas</li>
                <li>Pantalones y jeans</li>
            </ul>
        </section>

        <section class="caballero contenedor">
            <h2>Ropa para caballero</h2>
            <ul>
                <li>Camisas y playeras</li>
                <li>Pantalones y jeans</li>
                <li>Chaquetas y suéteres</li>
            </ul>
        </section>

        <section class="asesoria contenedor">
            <h2>Asesoría de imagen</h2>
            <p>Le ayudamos a combinar prendas y colores para cada ocasión: trabajo, fiesta o uso diario.</p>
            <a href="contacto.php" class="boton">Agendar una asesoría</a>
            <img src="img/asesores.jpg" alt="Asesora de imagen mostrando combinaciones de ropa a una clienta">
        </section>
    </main>

<?php include "footer.php"; ?>
