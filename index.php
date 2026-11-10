<?php $titulo = "DR3X | Tienda de ropa"; include "header.php"; ?>

    <main>
        <section class="portada">
            <h1>Vístete fuera de la norma</h1>
            <p>Encuentre las últimas tendencias en moda para dama y caballero, con atención personalizada.</p>
            <a href="contacto.php" class="boton">Escríbanos</a>
        </section>

        <section class="galeria contenedor">
            <h2>Galería</h2>
            <p>Algunas de nuestras prendas.</p>
            <!-- Estas tarjetas las dibuja JavaScript desde el arreglo "prendas" de js/main.js -->
            <div class="cards cards-prendas" id="galeria"></div>
        </section>

        <section class="preguntas contenedor">
            <h2>Preguntas frecuentes</h2>
            <div class="accordion">
                <div class="item">
                    <button class="titulo" type="button">¿Puedo cambiar una prenda si la talla no es la correcta?</button>
                    <div class="contenido"><p>Sí. La prenda debe estar en buen estado y contar con el comprobante de compra.</p></div>
                </div>
                <div class="item">
                    <button class="titulo" type="button">¿Qué formas de pago aceptan?</button>
                    <div class="contenido"><p>Efectivo, tarjeta de crédito y débito y transferencia sinpemovil.</p></div>
                </div>
                <div class="item">
                    <button class="titulo" type="button">¿Hacen envíos?</button>
                    <div class="contenido"><p>Sí, enviamos a todo el GAM en 1 a 2 días hábiles.</p></div>
                </div>
                <div class="item">
                    <button class="titulo" type="button">¿Cuál es el horario de atención?</button>
                    <div class="contenido"><p>Atendemos de lunes a sábado, de 9:00 a 18:00.</p></div>
                </div>
            </div>
        </section>
    </main>

<?php include "footer.php"; ?>
