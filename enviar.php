<?php
// La primera línea de este archivo DEBE ser <?php, sin espacios ni líneas en blanco antes.

// >>> Cambie este correo por el SUYO cuando quiera probar que los mensajes llegan. <<<
$destino = "info@dr3x.com";

// Si alguien abre enviar.php escribiendo la dirección (sin llenar el formulario), lo devolvemos al formulario.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contacto.php");
    exit;
}

$errores = [];

$nombre  = trim($_POST["nombre"] ?? "");
$correo  = trim($_POST["correo"] ?? "");
$mensaje = trim($_POST["mensaje"] ?? "");

// JavaScript puede desactivarse, por eso se valida OTRA VEZ aquí en el servidor.
if ($nombre === "") $errores[] = "El nombre es obligatorio.";
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) $errores[] = "Correo inválido.";
if ($mensaje === "") $errores[] = "El mensaje es obligatorio.";

if (count($errores) === 0) {
    // El nombre va en el asunto/cuerpo: quitamos saltos de línea para que nadie pueda "colar" encabezados falsos.
    $nombreSeguro = str_replace(["\r", "\n"], " ", $nombre);

    // El @ evita que XAMPP muestre un aviso si no tiene servidor de correo configurado.
    // En localhost normalmente no envía el correo, pero igual te lleva a gracias.php.
    @mail(
        $destino,
        "Mensaje desde el sitio DR3X",
        "Nombre: $nombreSeguro\nCorreo: $correo\n\n$mensaje",
        "From: no-reply@dr3x.com\r\nReply-To: $correo"   // Reply-To: al darle "responder" le contesta al cliente
    );
    header("Location: gracias.php");
    exit;
}

// Si llegamos aquí es porque hubo errores: se muestra la página con la lista.
$titulo = "Revise el formulario | DR3X";
include "header.php";
?>

    <main class="contenedor">
        <h1>Revise el formulario</h1>
        <ul>
            <?php foreach ($errores as $error) { echo "<li>" . htmlspecialchars($error) . "</li>"; } ?>
        </ul>
        <a href="contacto.php" class="boton">Volver al formulario</a>
    </main>

<?php include "footer.php"; ?>
