<?php
$ciudades = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Bilbao", "Alicante"];

$q = $_GET["q"];
$sugerencias = "";

if ($q !== "") {
    $q = strtolower($q);
    $len = strlen($q);
    foreach ($ciudades as $ciudad) {
        if (stristr($q, substr($ciudad, 0, $len))) {
            $sugerencias .= $sugerencias === "" ? $ciudad : ", $ciudad";
        }
    }
}

echo $sugerencias === "" ? "No hay coincidencias" : $sugerencias;
?>
