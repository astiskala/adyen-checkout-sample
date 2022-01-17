<?php

function logApiCall($method, $url, $headers, $body) {
  $encodedJson = json_decode($body, true);
  $jsonString = json_encode($encodedJson, JSON_PRETTY_PRINT);

  $logString = $method . " " . $url . PHP_EOL;
  $logString .= implode(PHP_EOL, $headers);
  $logString .= PHP_EOL;
  $logString .= $jsonString;
  $logString .= PHP_EOL;
  error_log($logString);
}

function logApiResponseHeaders($headers) {
  $logString = PHP_EOL;
  $logString .= PHP_EOL;
  $logString .= $headers;
  error_log($logString);
}

function logApiResponse($body) {
  $encodedJson = json_decode($body, true);
  $jsonString = json_encode($encodedJson, JSON_PRETTY_PRINT);

  $logString = PHP_EOL;
  $logString .= $jsonString;
  $logString .= PHP_EOL;
  error_log($logString);
}
