<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.css">
    <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <div class="checkout-container">
                <a href="../">Back</a>

                <h1>Zip Component</h1>
                <div class="payment-method">
                    <div id="zip-container">
                        <!-- Component will be rendered here -->
                    </div>
                </div>
            </div>

            <div class="info">
                <p>
                    To make a payment, follow the instructions at our <a href="https://docs.adyen.com/payment-methods/zip/web-component#test-and-go-live" target="_blank">test and go live documentation</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/payment-methods/zip/web-component" target="_blank">Zip Component documentation</a>.
                </p>
            </div>
        </div>

        <div class="sidebar">
            <div class="header">
                <h2>Current state</h2>
            </div>
            <pre class="current-state">{}</pre>
        </div>
    </div>

    <script src="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.js"></script>
    <script src="../assets/utils.js"></script>
    <script src="/zip/zip.js"></script>
</body>
</html>
