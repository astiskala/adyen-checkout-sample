<?php

require('utils/env.php');
require('utils/log.php');

require('api/originKeys.php');
require('api/paymentMethods.php');
require('api/payments.php');
require('api/paymentDetails.php');

// Basic routing
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

switch($request_uri[0]) {

    // /env
    case '/env':
        echo getEnvValue();
        break;

    // /originKeys
    case '/originKeys':
        header('Content-Type: application/json');
        echo getOriginKey();
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

    // /paymentDetails
    case '/paymentDetails':
        header('Content-Type: application/json');
        echo submitPaymentDetails();
        break;

    // default
    default:
        return false;

}
