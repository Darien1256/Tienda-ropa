<?php $titulo = "Servicios | DR3X"; include "header.php"; ?>

    <main>
        <section class="intro contenedor">
            <h1>Servicios</h1>
            <p>En DR3X le ofrecemos todo lo que necesita para renovar y cuidar su guardarropa: desde lavandería y tintorería hasta asesoría de imagen... Auque no deberiamos.</p>
            <p><strong>ADEMÁS, CONTAMOS CON UN SERVICIO DE ENTREGA A DOMICILIO PARA SU COMODIDAD!!!</strong></p>
            
        </section>

        <section class="cuidado contenedor">
            <h2>Cuidado y asesoría</h2>
            <!-- Estas tarjetas las dibuja JavaScript desde el arreglo "servicios" de js/main.js -->
            <div class="cards cards-servicios" id="lista-servicios"></div>
        </section>

        <section class="asesoria contenedor">
            <h2>Asesoría de imagen</h2>
            <p>Te ayudamos a elegir tu próxima compra!!.</p>
            <a href="contacto.php" class="boton">Agendar una asesoría</a>
            <img src="img/asesores.jpg" alt="Asesora de imagen mostrando combinaciones de ropa a una clienta">
        </section>
    </main>

<?php include "footer.php"; ?>
