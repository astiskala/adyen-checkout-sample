<?php

require('../utils/log.php');

if (file_get_contents('php://input') != '') {
    $request = json_decode(file_get_contents('php://input'), true);
} else {
    $request = array();
}

// Convert data to JSON
$json_data = json_encode($request);

$tmp = sys_get_temp_dir() . "/webhook";
error_log("Persisting webhook data '" . $json_data . "' to " . $tmp);
file_put_contents($tmp, $json_data);

echo '[accepted]';
