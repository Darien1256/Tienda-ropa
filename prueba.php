<?php

$nombre = "juan";
$precio = 8000;

if ($precio > 5000) echo "El producto es caro.";

$servicios = ["lavado", "pulido", "encerado"];

echo "<ul>";
foreach ($servicios as $s) {
    echo "<li>$s</li>";      // antes decía 1s: faltaba el signo $ para imprimir la variable
}
echo "</ul>";
