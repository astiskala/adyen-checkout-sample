<?php

function getEnvValue() {
    if ($_SERVER['QUERY_STRING'] != '') {
        $envValue = getenv($_SERVER['QUERY_STRING']);
        return $envValue;
    }
}
