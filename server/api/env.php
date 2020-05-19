<?php

require('../utils/log.php');

$envValue = $_SERVER['QUERY_STRING'];
if ($envVar != '' && $envVar != 'CHECKOUT_APIKEY') {
    echo $envValue;
}
