<?php

require('../utils/log.php');

$apikey = getenv('CHECKOUT_APIKEY');
$merchantAccount = getenv('MERCHANT_ACCOUNT');
$environment = getenv('ENVIRONMENT');
if ($environment == "test") {
  $domain = "checkout-test.adyen.com";
} else if ($environment == "live") {
  $prefix = getenv('PREFIX');
  if ($prefix) {
    $prefix = $prefix . "-";
  }

  $domain = $prefix . "checkout-live.adyenpayments.com/checkout";
}

$url = "https://" . $domain . "/v1/originKeys";

// Get the current domain
$domain = $_SERVER['HTTP_HOST'];
$protocol =  ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 3000) ? "http://" : "https://";

// Prepare the request
$data = [
    'originDomains' => [$protocol.$domain]
];

// Convert data to JSON
$json_data = json_encode($data);

// Initiate curl
$curlAPICall = curl_init();

// Set to POST
$method = "POST";
curl_setopt($curlAPICall, CURLOPT_CUSTOMREQUEST, $method);

// Will return the response, if false it print the response
curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, true);

// Add JSON message
curl_setopt($curlAPICall, CURLOPT_POSTFIELDS, $json_data);

// Set the url
curl_setopt($curlAPICall, CURLOPT_URL, $url);

// Api key
$headers = array(
    "X-Api-Key: " . $apikey,
    "Content-Type: application/json",
    "Content-Length: " . strlen($json_data)
);
curl_setopt($curlAPICall, CURLOPT_HTTPHEADER, $headers);

logApiCall($method, $url, $headers, $json_data);

// Execute
$result = curl_exec($curlAPICall);

// Error Check
if ($result === false){
  throw new Exception(curl_error($curlAPICall), curl_errno($curlAPICall));
}

// Closing
curl_close($curlAPICall);

logApiResponse($result);

// This file returns a JSON object
echo $result;
