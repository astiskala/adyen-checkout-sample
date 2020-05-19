<?php

require('../utils/log.php');

if ($_SERVER['QUERY_STRING'] != '') {
    $envValue = getenv($_SERVER['QUERY_STRING']);
    echo $envValue;
}
