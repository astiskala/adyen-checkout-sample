<?php

require('../utils/log.php');

$seconds_to_cache = 300;
$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache) . " GMT";
header("Expires: $ts");
header("Pragma: cache");
header("Cache-Control: max-age=$seconds_to_cache");

$envValue = $_SERVER['QUERY_STRING'];
if ($envValue != '' && $envValue != 'CHECKOUT_APIKEY') {
    echo getenv($envValue);
}
