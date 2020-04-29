<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */

require('utils/env.php');
require('utils/log.php');

require('api/paymentMethods.php');
require('api/payments.php');
require('api/originKeys.php');

// Basic routing
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

switch($request_uri[0]) {

    // /env
    case '/env':
        echo getEnvValue();
        break;

    // /paymentMethods
    case '/paymentMethods':
        header('Content-Type: application/json');
        echo getPaymentMethods();
        break;

    // /payments
    case '/payments':
        header('Content-Type: application/json');
        echo initiatePayment();
        break;

    // /originKeys
    case '/originKeys':
        header('Content-Type: application/json');
        echo getOriginKey();
        break;

    // default
    default:
        return false;

}
