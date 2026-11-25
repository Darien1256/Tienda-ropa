<?php $titulo = "DR3X | Tienda de ropa"; include "header.php"; ?>

    <main>
        <section class="portada">
            <h1>Vístete fuera de la norma</h1>
            <p>Encuentre las últimas tendencias en moda para dama y caballero, con atención personalizada.</p>
            <a href="contacto.php" class="boton">Escríbanos</a>
        </section>

        <!-- CARRUSEL: las imágenes pasantes. js/main.js (sección 4) muestra una .slide a la vez -->
        <section class="novedades contenedor">
            <h2>Novedades</h2>
            <div class="carrusel" id="carrusel">
                <div class="slides">
                    <article class="slide activa">
                        <img src="img/banner-coleccion.jpg" alt="Tres prendas punk de DR3X en oferta: una playera desgastada, un vestido con cadenas y un pantalón con correas">
                        <span class="slide-descuento" aria-hidden="true">-30%</span>
                        <div class="slide-texto">
                            <h3>Black Friday</h3>
                            <p>30% de descuento en estas tres prendas.</p>
                            <a href="#prendas" class="boton">Ver ofertas</a>
                        </div>
                    </article>
                    <article class="slide">
                        <img src="img/tienda.jpg" alt="Fachada iluminada de la tienda DR3X con prendas en exhibición" loading="lazy">
                        <div class="slide-texto">
                            <h3>Visite nuestra tienda</h3>
                            <p>Calle Principal 10-20, Centro. Lunes a sábado de 9:00 a 18:00.</p>
                            <a href="contacto.php" class="boton">Cómo llegar</a>
                        </div>
                    </article>
                    <article class="slide">
                        <img src="img/asesores.jpg" alt="Asesora de imagen mostrando prendas a una clienta" loading="lazy">
                        <div class="slide-texto">
                            <h3>Asesoría de imagen</h3>
                            <p>Le ayudamos a combinar prendas y colores para cada ocasión.</p>
                            <a href="servicios.php" class="boton">Ver servicios</a>
                        </div>
                    </article>
                    <article class="slide">
                        <img src="img/Express.png" alt="Camión de reparto con líneas de velocidad, ícono del servicio express" loading="lazy">
                        <div class="slide-texto">
                            <h3>Servicio express</h3>
                            <p>Recogida y entrega a domicilio en todo el GAM.</p>
                            <a href="servicios.php" class="boton">Conocer más</a>
                        </div>
                    </article>
                </div>

                <button type="button" class="carrusel-btn carrusel-anterior" id="anterior" aria-label="Imagen anterior">&#8249;</button>
                <button type="button" class="carrusel-btn carrusel-siguiente" id="siguiente" aria-label="Imagen siguiente">&#8250;</button>
                <button type="button" class="carrusel-pausa" id="pausa" aria-label="Pausar carrusel">
                    <svg class="icono-pausa" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1"></rect><rect x="9.5" y="2" width="3.5" height="12" rx="1"></rect></svg>
                    <svg class="icono-play" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2l10 6-10 6z"></path></svg>
                </button>
                <div class="puntos" id="puntos"></div>
            </div>
        </section>

        <section class="galeria contenedor" id="prendas">
            <h2>Galería</h2>
            <p>Algunas de nuestras prendas. Las que tienen la etiqueta -30% están en oferta de Black Friday. Elija su talla y agréguelas al carrito.</p>
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
                    <div class="contenido"><p>Sí, enviamos a todo el GAM en 1 a 2 días hábiles. El envío cuesta ₡3.000 y es gratis en compras desde ₡40.000.</p></div>
                </div>
                <div class="item">
                    <button class="titulo" type="button">¿Cuál es el horario de atención?</button>
                    <div class="contenido"><p>Atendemos de lunes a sábado, de 9:00 a 18:00.</p></div>
                </div>
            </div>
        </section>
    </main>

<?php include "footer.php"; ?>
