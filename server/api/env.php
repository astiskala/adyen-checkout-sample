<?php

require('../utils/log.php');

$envValue = $_SERVER['QUERY_STRING'];
if ($envValue != '' && $envValue != 'CHECKOUT_APIKEY') {
    echo getenv($envValue);
}
