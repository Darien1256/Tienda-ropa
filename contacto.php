<?php $titulo = "Contacto | DR3X"; include "header.php"; ?>

    <main>
        <section class="contacto contenedor">
            <h1>Contacto</h1>
            <p>Escríbanos y le responderemos lo antes posible.</p>
            <form action="enviar.php" method="post" class="formulario" id="formulario" novalidate> <!--Formulario de contacto-->
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" required>

                <label for="correo">Correo</label>
                <input type="email" id="correo" name="correo" required>

                <label for="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
                <p class="mensajes" id="mensajes" role="alert"></p>  <!--Errores-->

                <button type="submit">Enviar</button>
            </form>
        </section>

        <section class="ubicacion contenedor">
            <h2>Visítenos</h2>
            <p>Radial Francisco J. Orlich, Alajuela, Alajuela (Tercera planta). Horario: lunes a sábado de 9:00 a 18:00.</p>
            <img src="img/tienda.jpg" alt="Fachada de la tienda DR3X">
        </section>
    </main>

<?php include "footer.php"; ?>
