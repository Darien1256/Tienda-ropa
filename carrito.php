<!-- =========================================================
     carrito.php · el carrito (panel lateral) y el pago SIMULADO.
     Se incluye desde footer.php. Todo está oculto hasta que js/main.js (secciones 6 y 7)
     le pone la clase "abierto". Las líneas del carrito las dibuja JavaScript.
     ========================================================= -->

<!-- Fondo oscuro detrás del carrito -->
<div class="overlay" id="overlay"></div>

<!-- PANEL DEL CARRITO -->
<aside class="carrito" id="carrito" role="dialog" aria-modal="true" aria-labelledby="carritoTitulo">
    <div class="carrito-cabecera">
        <h2 class="carrito-titulo" id="carritoTitulo">Tu carrito <span id="carritoConteo"></span></h2>
        <button type="button" class="cerrar" id="cerrarCarrito" aria-label="Cerrar carrito">&times;</button>
    </div>

    <!-- Aquí JavaScript dibuja una línea por cada producto -->
    <div class="carrito-lista" id="carritoLista"></div>

    <div class="carrito-pie">
        <p class="envio-mensaje" id="envioMensaje"></p>
        <progress class="envio-barra" id="envioBarra" max="40000" value="0"></progress>

        <dl class="totales">
            <div><dt>Subtotal</dt><dd id="totalSubtotal">₡0</dd></div>
            <div><dt>Envío</dt><dd id="totalEnvio">₡0</dd></div>
            <div class="total-ahorro oculto" id="filaAhorro"><dt>Ahorras con Black Friday</dt><dd id="totalAhorro">₡0</dd></div>
            <div class="total-final"><dt>Total</dt><dd id="totalFinal">₡0</dd></div>
        </dl>

        <button type="button" class="boton boton-pago" id="btnPagar" disabled>Ir a pagar</button>
        <button type="button" class="enlace" id="btnVaciar">Vaciar carrito</button>
    </div>
</aside>


<!-- VENTANA DE PAGO (SIMULADA): no cobra nada ni envía datos a ningún lado -->
<div class="modal" id="modalPago" role="dialog" aria-modal="true" aria-labelledby="pagoTitulo">
    <div class="modal-caja">
        <button type="button" class="cerrar cerrar-oscuro" id="cerrarPago" aria-label="Cerrar ventana de pago">&times;</button>

        <!-- Paso 1: formulario de pago -->
        <form id="formPago" class="paso-pago" novalidate autocomplete="off">
            <h2 id="pagoTitulo">Finalizar compra</h2>

            <p class="aviso-simulacion">
                <strong>Modo de práctica:</strong> esta tienda es un proyecto de clase.
                No se cobra nada ni se guarda ningún dato. <strong>No escriba datos reales.</strong>
            </p>

            <p class="pago-resumen">Total a pagar: <strong id="pagoTotal">₡0</strong> <span id="pagoUnidades"></span></p>

            <label for="pagoNombre">Nombre completo</label>
            <input type="text" id="pagoNombre" name="nombre" placeholder="Ej: Ana Pérez">

            <label for="pagoCorreo">Correo electrónico</label>
            <input type="email" id="pagoCorreo" name="correo" placeholder="Ej: ana@correo.com">

            <fieldset class="metodos">
                <legend>Método de pago</legend>
                <label class="metodo"><input type="radio" name="metodo" value="tarjeta" checked><span>Tarjeta</span></label>
                <label class="metodo"><input type="radio" name="metodo" value="sinpe"><span>SINPE Móvil</span></label>
                <label class="metodo"><input type="radio" name="metodo" value="contraentrega"><span>Contra entrega</span></label>
            </fieldset>

            <!-- Panel: tarjeta -->
            <div class="panel-pago activo" data-metodo="tarjeta">
                <label for="tarjetaNumero">Número de tarjeta</label>
                <input type="text" id="tarjetaNumero" name="tarjeta" inputmode="numeric" maxlength="19" placeholder="4242 4242 4242 4242">
                <div class="fila-doble">
                    <div>
                        <label for="tarjetaVence">Vence (MM/AA)</label>
                        <input type="text" id="tarjetaVence" name="vence" inputmode="numeric" maxlength="5" placeholder="12/30">
                    </div>
                    <div>
                        <label for="tarjetaCvv">CVV</label>
                        <input type="text" id="tarjetaCvv" name="cvv" inputmode="numeric" maxlength="4" placeholder="123">
                    </div>
                </div>
                <p class="ayuda">Para la demo sirve cualquier número de 16 dígitos.</p>
            </div>

            <!-- Panel: SINPE Móvil -->
            <div class="panel-pago" data-metodo="sinpe">
                <p>Envíe el monto por SINPE Móvil al <strong>2222-2222</strong> (DR3X) y escriba abajo su número de teléfono.</p>
                <label for="sinpeTelefono">Su número de teléfono</label>
                <input type="text" id="sinpeTelefono" name="telefono" inputmode="numeric" maxlength="8" placeholder="88888888">
            </div>

            <!-- Panel: contra entrega -->
            <div class="panel-pago" data-metodo="contraentrega">
                <p>Pagará en efectivo cuando reciba su pedido.</p>
                <label for="entregaDireccion">Dirección de entrega</label>
                <input type="text" id="entregaDireccion" name="direccion" placeholder="Calle, número y referencia">
            </div>

            <p class="mensajes" id="mensajesPago" role="alert"></p>

            <button type="submit" class="boton boton-pago" id="btnConfirmarPago">Pagar ahora</button>
        </form>

        <!-- Paso 2: "procesando" (falso, solo dura unos segundos) -->
        <div class="paso-procesando oculto" id="pasoProcesando">
            <div class="spinner" aria-hidden="true"></div>
            <h2>Procesando su pago…</h2>
            <p role="status">Por favor espere unos segundos.</p>
        </div>

        <!-- Paso 3: pedido "aprobado" -->
        <div class="paso-exito oculto" id="pasoExito">
            <div class="check" aria-hidden="true">&#10003;</div>
            <h2>¡Pedido confirmado!</h2>
            <p class="aviso-simulacion"><strong>Simulación:</strong> no se realizó ningún cobro real.</p>
            <p>Pedido <strong id="exitoNumero"></strong></p>
            <p id="exitoCorreo"></p>
            <ul class="recibo" id="exitoLista"></ul>
            <p class="recibo-total">Total: <strong id="exitoTotal"></strong></p>
            <p id="exitoMetodo"></p>
            <button type="button" class="boton boton-pago" id="btnSeguir">Seguir comprando</button>
        </div>
    </div>
</div>

<!-- Aviso corto: "Vestido punk agregado" -->
<div class="aviso" id="aviso" role="status" aria-live="polite"></div>
