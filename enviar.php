//Arreglo de contacto
<?php
$errores = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre  = trim($_POST["nombre"] ?? "");
    $correo  = trim($_POST["correo"] ?? "");
    $mensaje = trim($_POST["mensaje"] ?? "");

    if ($nombre === "") $errores[] = "El nombre es obligatorio.";  //Validacion de servidor 
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) $errores[] = "Correo inválido.";
    if ($mensaje === "") $errores[] = "El mensaje es obligatorio.";

    if (count($errores) === 0) {
        @mail("info@dr3x.com", "Mensaje desde el sitio DR3X",
            "Nombre: $nombre\nCorreo: $correo\n\n$mensaje",
            "From: no-reply@dr3x.com");
        header("Location: gracias.php");
        exit;
    }
}
?>
<?php $titulo = "Revise el formulario | DR3X"; include "header.php"; ?>

    <main class="contenedor">
        <h1>Revise el formulario</h1>
        <ul>
            <?php foreach ($errores as $error) { echo "<li>" . htmlspecialchars($error) . "</li>"; } ?>
        </ul>
        <a href="contacto.php" class="boton">Volver al formulario</a>
    </main>

<?php include "footer.php"; ?>
