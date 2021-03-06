<?php

require('../utils/log.php');

if (file_get_contents('php://input') != '') {
    $request = json_decode(file_get_contents('php://input'), true);
} else {
    $request = array();
}

$apikey = getenv('CHECKOUT_APIKEY');
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

$url = "https://" . $domain . "/v{$version}/payments";

// Convert data to JSON
$json_data = json_encode($request);

//  Initiate curl
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

$json = json_decode($result, true);
if (isset($json["action"])) {
  $tmp = sys_get_temp_dir() . "/paymentData";

  $paymentData = "";
  if (isset($json["action"]["paymentData"])) {
    $paymentData = $json["action"]["paymentData"];
    error_log("Persisting paymentData '" . $paymentData . "' to " . $tmp);
  } else {
    error_log("No paymentData to persist");
  }

  file_put_contents($tmp, $paymentData);
}

// This file returns a JSON object
echo $result;
