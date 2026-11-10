<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titulo ?? "DR3X | Tienda de ropa"; ?></title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <header class="header">
        <a href="index.php" class="logo">DR3X</a>

        <button class="hamburguesa" id="btnMenu" type="button" aria-label="Abrir menú" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>

        <nav class="menu" id="menu">
            <ul>
                <li><a href="index.php">Inicio</a></li>
                <li><a href="nosotros.php">Nosotros</a></li>
                <li><a href="servicios.php">Servicios</a></li>
                <li><a href="contacto.php">Contacto</a></li>
            </ul>
        </nav>
    </header>
