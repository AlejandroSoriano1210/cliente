<?php
$ciudades = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Bilbao", "Alicante", "Cádiz", "Granada", "Cartagena", "Melilla", "Gran Canarias", "Tenerife", "Ceuta"];

$q = $_GET["q"];
$sugerencias = "";

if ($q !== "") {
    //pasamos a minúsculas para que no sea case sensitive
    $q = strtolower($q);
    //longitud de la cadena
    $length = strlen($q);
    //bucle para hacer la búsqueda
    foreach ($ciudades as $ciudad) {
        //condición para que la búsqueda sea por el principio de la cadena
        if (stristr($q, substr($ciudad, 0, $length))) {
            $sugerencias .= $sugerencias === "" ? $ciudad : ", $ciudad";
        }
    }
}
//mostramos el resultado
echo $sugerencias === "" ? "No hay coincidencias" : $sugerencias;
?>
