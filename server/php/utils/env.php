<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */

/**
 * Retrieves environment variable
 */
function getEnvValue() {
    if ($_SERVER['QUERY_STRING'] != '') {
        $envValue = getenv($_SERVER['QUERY_STRING']);
        return $envValue;
    }
}
