<div class="overlay" id="overlay"></div> <!--Fondo oscuro para el panel-->

<!-- PANEL DEL CARRITO -->
<aside class="carrito" id="carrito" role="dialog" aria-modal="true" aria-labelledby="carritoTitulo">
    <div class="carrito-cabecera">
        <h2 class="carrito-titulo" id="carritoTitulo">Tu carrito <span id="carritoConteo"></span></h2>
        <button type="button" class="cerrar" id="cerrarCarrito" aria-label="Cerrar carrito">&times;</button>
    </div>

    <div class="carrito-lista" id="carritoLista"></div> <!--Divide los productos-->

    <div class="carrito-pie">
        <p class="envio-mensaje" id="envioMensaje"></p>
        <progress class="envio-barra" id="envioBarra" max="40000" value="0"></progress> <!--Este es el minimo para que el envio sea gratis-->

        <dl class="totales">
            <div><dt>Subtotal</dt><dd id="totalSubtotal">₡0</dd></div> <!--Sumar todo y conversion descuento-->
            <div><dt>Envío</dt><dd id="totalEnvio">₡0</dd></div>
            <div class="total-ahorro oculto" id="filaAhorro"><dt>Se ahorra gracias a Black Friday</dt><dd id="totalAhorro">₡0</dd></div>
            <div class="total-final"><dt>Total</dt><dd id="totalFinal">₡0</dd></div>
        </dl>

        <button type="button" class="boton boton-pago" id="btnPagar" disabled>Ir a pagar</button>
        <button type="button" class="enlace" id="btnVaciar">Vaciar carrito</button>
    </div>
</aside>

<div class="modal" id="modalPago" role="dialog" aria-modal="true" aria-labelledby="pagoTitulo"> <!--Simulacion de pago-->
    <div class="modal-caja">
        <button type="button" class="cerrar cerrar-oscuro" id="cerrarPago" aria-label="Cerrar ventana de pago">&times;</button>

        <!-- Paso 1: formulario de pago -->
        <form id="formPago" class="paso-pago" novalidate autocomplete="off">
            <h2 id="pagoTitulo">Finalizar compra</h2>

            <p class="aviso-simulacion">
                <strong>Revisa bien sus datos antes de realizar cualquier compra:</strong> Seleccione su metodo de pago.
                En caso de ser en efectivo asegurate de TENER EL DINERO EN EFECTIVO. <strong>(Ojalá sirviera y sí me depositaran).</strong>
            </p>

            <p class="pago-resumen">Total a pagar: <strong id="pagoTotal">₡0</strong> <span id="pagoUnidades"></span></p>

            <label for="pagoNombre">Nombre completo</label>
            <input type="text" id="pagoNombre" name="nombre" placeholder="Ejemplo: Darien Parra">
            <label for="pagoCorreo">Correo electrónico</label>
            <input type="email" id="pagoCorreo" name="correo" placeholder="Ejemplo: XXXXXX@gmail.com">

            <fieldset class="metodos">
                <legend>Método de pago</legend>
                <label class="metodo"><input type="radio" name="metodo" value="tarjeta" checked><span>Tarjeta</span></label>
                <label class="metodo"><input type="radio" name="metodo" value="sinpe"><span>SINPE Móvil</span></label>
                <label class="metodo"><input type="radio" name="metodo" value="efectivo"><span>Efectivo</span></label>
            </fieldset>

            <div class="panel-pago activo" id="panel-tarjeta">  <!--Opcion tarjeta-->
                <label for="tarjetaNumero">Número de tarjeta</label>
                <input type="text" id="tarjetaNumero" name="tarjeta" inputmode="numeric" maxlength="19" placeholder="XXXX XXXX XXXX XXXX">
                <div class="fila-doble">
                    <div>
                        <label for="tarjetaVence">Vence (MM/AA)</label>
                        <input type="text" id="tarjetaVence" name="vence" inputmode="numeric" maxlength="5" placeholder="12/XX">
                    </div>
                    <div>
                        <label for="tarjetaCvv">CVV</label>
                        <input type="text" id="tarjetaCvv" name="cvv" inputmode="numeric" maxlength="3" placeholder="XXX">
                    </div>
                </div>
                <p class="ayuda">Sirve cualquier número de 16 dígitos.</p>
            </div>

            <div class="panel-pago" id="panel-sinpe"> <!--Opcion SINPE Móvil -->
                <p>Envíe el monto por SINPE Móvil al <strong>2222-2222</strong> (DR3X) y escribe su número de teléfono.</p>
                <label for="sinpeTelefono">Su número de teléfono</label>
                <input type="text" id="sinpeTelefono" name="telefono" inputmode="numeric" maxlength="8" placeholder="XXXXXXXX">
            </div>

            <div class="panel-pago" id="panel-efectivo"> <!--Compra en efectivo.-->
                <p>Pagará en efectivo cuando reciba su pedido (NO FIAMOS ASEGURATE DE TENERLO EN MANO).</p>
                <label for="entregaDireccion">Dirección de entrega</label>
                <input type="text" id="entregaDireccion" name="direccion" placeholder="Calle, número y referencia">
            </div>

            <p class="mensajes" id="mensajesPago" role="alert"></p>

            <button type="submit" class="boton boton-pago" id="btnConfirmarPago">Pagar ahora</button>
        </form>

        <div class="paso-procesando oculto" id="pasoProcesando"> <!--menú procesando pedido--> 
            <div class="spinner" aria-hidden="true"></div> <!--Este comando simula una compra, es decir, hace que tarde un momento-->
            <h2>Procesando su pago…</h2>
            <p role="status">Por favor espere unos segundos.</p>
        </div>

        <div class="paso-exito oculto" id="pasoExito"> <!--menú de compra con exito-->
            <div class="check" aria-hidden="true">&#10003;</div> <!--Al igual que el anterior, simula compra.-->
            <h2>¡Pedido confirmado!</h2>
            <p class="aviso-simulacion"><strong>Gracias por su compra:</strong> Verifique su compra en la bandeja de entrada de tu correo electrónico (no es real :P, pero ojalá tener esa plata).</p>
            <p>Pedido <strong id="exitoNumero"></strong></p>
            <p id="exitoCorreo"></p>
            <ul class="recibo" id="exitoLista"></ul>
            <p class="recibo-total">Total: <strong id="exitoTotal"></strong></p>
            <p id="exitoMetodo"></p>
            <button type="button" class="boton boton-pago" id="btnSeguir">Seguir comprando</button>
        </div>
    </div>
</div>

<div class="aviso" id="aviso" role="status" aria-live="polite"></div> <!--Comentario agregar carrito-->
