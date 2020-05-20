<?php

require('../utils/log.php');

$seconds_to_cache = 300;
$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache) . " GMT";
header("Expires: $ts");
header("Pragma: cache");
header("Cache-Control: max-age=$seconds_to_cache");

$envValue = $_SERVER['QUERY_STRING'];
if ($envValue != '' && $envValue != 'CHECKOUT_APIKEY') {
    $rawValue = getenv($envValue);
    $finalValue = str_replace("{guid}", GUIDv4(), $rawValue);
    echo $finalValue;
}

function GUIDv4()
{
    // Windows
    if (function_exists('com_create_guid') === true) {
        return trim(com_create_guid(), '{}');
    }

    // OSX/Linux
    if (function_exists('openssl_random_pseudo_bytes') === true) {
        $data = openssl_random_pseudo_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);    // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);    // set bits 6-7 to 10
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    // Fallback (PHP 4.2+)
    mt_srand((double)microtime() * 10000);
    $charid = strtolower(md5(uniqid(rand(), true)));
    $hyphen = chr(45);
    $guidv4 = substr($charid,  0,  8).$hyphen.
              substr($charid,  8,  4).$hyphen.
              substr($charid, 12,  4).$hyphen.
              substr($charid, 16,  4).$hyphen.
              substr($charid, 20, 12);
    return $guidv4;
}
