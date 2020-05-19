<?php

require('server/utils/env.php');
require('server/utils/log.php');

require('server/api/originKeys.php');
require('server/api/paymentMethods.php');
require('server/api/payments.php');
require('server/api/paymentDetails.php');

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

    case '/':
        header('Content-Type: text/html');
        require __DIR__ . '/src/index.html';
        break;

    // default
    default:
        if (strpos($request_uri[0], '.') !== false) {
          $extension = explode('.', $request_uri[0], 2);
          if ($extension[1] == "css") {
            header('Content-Type: text/css');
          } elseif ($extension[1] == "js") {
            header('Content-Type: application/js');
          } elseif ($extension[1] == "ico") {
            header('Content-Type: image/x-icon');
          } elseif ($extension[1] == "html") {
            header('Content-Type: text/html');
          } else {
            return;
          }

          require __DIR__ . '/src' . $request_uri[0];
        } else {
          header('Content-Type: text/html');
          require __DIR__ . '/src' . $request_uri[0] . '/index.php';
        }

        break;
}
