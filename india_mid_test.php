<?php

    error_reporting(E_ERROR | E_PARSE);

    $apikey = "AQEyhmfxKI/LYxVDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZigl+R4PB2Tf3IiaJSppDes4QwV1bDb7kfNy1WIxIIkxgBw==-wAJI97fH8xb5PQgmLd3lqPoUqAoiN+dozCeoXYoRKs0=-A3rWz,zr58b._haS";
    $paymentMethodsUrl = "https://14bc048714e340cf-AdyenTechSupport-checkout-live.adyenpayments.com/checkout/v69/paymentMethods";
    $paymentsUrl = "https://14bc048714e340cf-AdyenTechSupport-checkout-live.adyenpayments.com/checkout/v69/payments";
    $paymentsDetailsUrl = "https://14bc048714e340cf-AdyenTechSupport-checkout-live.adyenpayments.com/checkout/v69/payments/details";
    $merchantAccount = "IndiaTestGlobalDC";
    $returnUrl = "https://adamstiskala-adyen.azurewebsites.net/india_mid_test.php";

    $apikey = "AQEyhmfxLIvNahBEw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiujf7f0IvpjipVOeGaLWvNMQwV1bDb7kfNy1WIxIIkxgBw==-zuNrefVckhKrv+YIDzsd7OzkvGe7sJLzqnZMH0FeQb8=-ubR5m7ZeS94G4xdR";
    $paymentMethodsUrl = "https://checkout-test.adyen.com/v69/paymentMethods";
    $paymentsUrl = "https://checkout-test.adyen.com/v69/payments";
    $paymentsDetailsUrl = "https://checkout-test.adyen.com/v69/payments/details";
    $merchantAccount = "AdamStiskala35209";
    $returnUrl = "http://localhost:3000/india_mid_test.php";

    if (file_get_contents('php://input') != '') {
        $inputRequest = json_decode(file_get_contents('php://input'), true);
        if ($inputRequest != "" and $_GET["payments"] == "true") {
            $jsonInput = json_encode($inputRequest);

            $request->merchantAccount = $merchantAccount;
            $request->amount->currency = "INR";
            $request->amount->value = $inputRequest["amount"];
            $request->reference = "Test_" + date("YmdHis");
            $request->paymentMethod = $inputRequest["paymentMethod"];
            $request->returnUrl = $returnUrl;
            $request->browserInfo = $inputRequest["browserInfo"];
            $request->riskData = $inputRequest["riskData"];
            $request->additionalData->customRoutingFlag = $inputRequest["customRoutingFlag"];
        
            $json_data = json_encode($request);
        
            $curlAPICall = curl_init();
        
            $method = "POST";
            curl_setopt($curlAPICall, CURLOPT_CUSTOMREQUEST, $method);
            curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curlAPICall, CURLOPT_POSTFIELDS, $json_data);
            curl_setopt($curlAPICall, CURLOPT_URL, $paymentsUrl);
        
            $headers = array(
                "X-Api-Key: " . $apikey,
                "Content-Type: application/json",
                "Content-Length: " . strlen($json_data)
            );
        
            curl_setopt($curlAPICall, CURLOPT_HTTPHEADER, $headers);
        
            $result = curl_exec($curlAPICall);
        
            curl_close($curlAPICall);

            echo $result;
            return;
        }
    }

    if ($inputRequest != "" and $_GET["paymentsDetails"] == "true") {
        $jsonInput = json_encode($inputRequest);

        $request = $jsonInput;
    
        $curlAPICall = curl_init();
    
        $method = "POST";
        curl_setopt($curlAPICall, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlAPICall, CURLOPT_POSTFIELDS, $request);
        curl_setopt($curlAPICall, CURLOPT_URL, $paymentsDetailsUrl);
    
        $headers = array(
            "X-Api-Key: " . $apikey,
            "Content-Type: application/json",
            "Content-Length: " . strlen($request)
        );
    
        curl_setopt($curlAPICall, CURLOPT_HTTPHEADER, $headers);
    
        $result = curl_exec($curlAPICall);
    
        curl_close($curlAPICall);

        echo $result;
        return;
    }

?>

<!doctype html>
<html lang="en">
  <head>
    <title>India MID Test</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <script src="https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/5.20.0/adyen.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/5.20.0/adyen.css" crossorigin="anonymous">  
  </head>
  <body>
    <div class="container-fluid">
        <h1>India MID Test</h1>

<?php

$customRoutingFlag = $_POST["customRoutingFlag"];
$redirectResult = $_GET["redirectResult"];
$resultCode = $_GET["resultCode"];
if ($customRoutingFlag == "" and $redirectResult == "" and $resultCode == "") {

?>

        <form action="india_mid_test.php" method="post">
            <div class="form-group">
                <label for="customRoutingFlag">Custom Routing Flag:</label>
                <input type="text" name="customRoutingFlag" class="form-control" required>
                <small id="customRoutingFlagHelp" class="form-text text-muted">Should be the same as the merchant's merchat account code.</small>
            </div>
            <div class="form-group">
                <label for="amountValue">Amount (INR):</label>
                <input type="text" name="amountValue" class="form-control" required>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Start Payment</button>
        </form>

    <?php

} else {

?>

        <div id="dropin-container"></div>
        <div id="result"></div>
        <a href="india_mid_test.php">Start Over</a>
    </div>

<?php

}

if ($customRoutingFlag != "") {

    $request->merchantAccount = $merchantAccount;
    $request->amount->currency = "INR";
    $request->amount->value = intval($_POST["amountValue"] * 100);
    $request->countryCode = "IN";

    $json_data = json_encode($request);

    $curlAPICall = curl_init();

    $method = "POST";
    curl_setopt($curlAPICall, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlAPICall, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($curlAPICall, CURLOPT_URL, $paymentMethodsUrl);

    $headers = array(
        "X-Api-Key: " . $apikey,
        "Content-Type: application/json",
        "Content-Length: " . strlen($json_data)
    );

    curl_setopt($curlAPICall, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($curlAPICall);

    curl_close($curlAPICall);
?>

    <script>
        const configuration = {
            paymentMethodsResponse: <?php echo $result ?>,
            //clientKey: 'live_KDCFVZGW2VE3LIQBBG4AP7R6A4QNNEWC',
            clientKey: 'test_73KJZLA5WZFNJHIHSB2YCII2ZA6CO27V',
            locale: 'en-US',
            //environment: 'live',
            environment: 'test',
            onSubmit: (state, dropin) => {
                state.data.customRoutingFlag = '<?php echo $customRoutingFlag; ?>';
                state.data.amount = '<?php echo intval($_POST["amountValue"] * 100); ?>';
                console.info(state, dropin);
                fetch(`india_mid_test.php?payments=true`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(state.data),
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.action) {
                        dropin.handleAction(response.action);
                    } else if (response.resultCode) {
                        var message = response.resultCode + '\nPSP Reference: ' + response.pspReference;
                        dropin.setStatus('success', { message: message });
                    } else if (response.message) {
                        dropin.setStatus('success', { message: response.message });
                    }
                });
            },
            onAdditionalDetails: (state, dropin) => {
                console.info(state, dropin);
                fetch(`india_mid_test.php?paymentsDetails=true`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(state.data),
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.action) {
                        dropin.handleAction(response.action);
                    } else if (response.resultCode) {
                        var message = response.resultCode + '\nPSP Reference: ' + response.pspReference;
                        dropin.setStatus('success', { message: message });
                    } else if (response.message) {
                        dropin.setStatus('success', { message: response.message });
                    }
                });
            },
            onError: (error) => {
                console.error(error.name, error.message, error.stack);
                var element = document.getElementById("result");
                element.insertAdjacentHTML('beforeend', '<p class="text-center">' + error.message + '</p>', element.firstChild);
            }
        };

        (async function(){
            const checkout = await AdyenCheckout(configuration);            
            const dropinComponent = checkout.create('dropin').mount('#dropin-container');
        })();

    </script>

<?php

} elseif ($redirectResult != "") {

    $jsonInput = json_encode($inputRequest);

    $request->details->redirectResult = $redirectResult;

    $json_data = json_encode($request);

    $curlAPICall = curl_init();

    $method = "POST";
    curl_setopt($curlAPICall, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlAPICall, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($curlAPICall, CURLOPT_URL, $paymentsDetailsUrl);

    $headers = array(
        "X-Api-Key: " . $apikey,
        "Content-Type: application/json",
        "Content-Length: " . strlen($json_data)
    );

    curl_setopt($curlAPICall, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($curlAPICall);

    curl_close($curlAPICall);

    $resultJson = json_decode($result, true);

?>

    <p class="text-center"><strong><?php echo $resultJson["resultCode"]; ?></strong></p>
    <p class="text-center">PSP Reference: <?php echo $resultJson["pspReference"]; ?></p>

<?php

} elseif ($resultCode != "") {

    echo "<p class=\"text-center\">$resultCode</p>";

}

?>
  </body>
</html>