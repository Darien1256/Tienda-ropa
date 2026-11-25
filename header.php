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

        <!-- Carrito + hamburguesa juntos, a la derecha del logo -->
        <div class="acciones">
            <button class="btn-carrito" id="btnCarrito" type="button" aria-label="Abrir carrito" aria-expanded="false" aria-controls="carrito">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M6 7h12l1 13H5L6 7z"></path>
                    <path d="M9 7V6a3 3 0 0 1 6 0v1"></path>
                </svg>
                <span class="carrito-mini" id="miniTotal">₡0</span>
                <span class="contador-carrito vacio" id="contadorCarrito">0</span>
            </button>

            <button class="hamburguesa" id="btnMenu" type="button" aria-label="Abrir menú" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>

        <nav class="menu" id="menu">
            <ul>
                <li><a href="index.php">Inicio</a></li>
                <li><a href="nosotros.php">Nosotros</a></li>
                <li><a href="servicios.php">Servicios</a></li>
                <li><a href="contacto.php">Contacto</a></li>
            </ul>
        </nav>
    </header>
