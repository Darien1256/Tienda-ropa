<?php
// La primera línea de este archivo DEBE ser <?php, sin espacios ni líneas en blanco antes.
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
    // El @ evita que XAMPP muestre un aviso si no tiene servidor de correo configurado.
    // En localhost normalmente no envía el correo, pero igual te lleva a gracias.php.
    @mail(
        "info@dr3x.com",
        "Mensaje desde el sitio DR3X",
        "Nombre: $nombre\nCorreo: $correo\n\n$mensaje",
        "From: no-reply@dr3x.com"
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
