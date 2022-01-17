<?php

require('../utils/log.php');

if (file_get_contents('php://input') != '') {
    $request = json_decode(file_get_contents('php://input'), true);
} else {
    $request = array();
}

$apikey = getenv('CHECKOUT_APIKEY');
$merchantAccount = getenv('MERCHANT_ACCOUNT');
$version = getenv('CHECKOUT_API_VERSION');
$environment = getenv('ENVIRONMENT');
if ($environment == "test") {
  $domain = "checkout-test.adyen.com";
} else {
  $prefix = getenv('PREFIX');
  if ($prefix) {
    $prefix = $prefix . "-";
  }

  $domain = $prefix . "checkout-live.adyenpayments.com/checkout";
}

$url = "https://" . $domain . "/v{$version}/sessions";

// Convert data to JSON
$json_data = json_encode($request);

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

// Get the headers in the response
curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curlAPICall, CURLOPT_HEADER, 1);

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

$header_size = curl_getinfo($curlAPICall, CURLINFO_HEADER_SIZE);
$header = substr($result, 0, $header_size);
$body = substr($result, $header_size);

// Closing
curl_close($curlAPICall);

logApiResponseHeaders($header);
logApiResponse($body);

// This file returns a JSON object
echo $body;
