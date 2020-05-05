<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout Components sample code</title>
    <link rel="stylesheet" href="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.css">
    <link rel="stylesheet" href="../demo.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../">Back</a>

            <div class="checkout-container">
                <h1>SEPA Direct Debit Component</h1>
                <div class="payment-method">
                    <div id="sepa-container" class="payment-method__container">
                        <!-- SEPA Direct Debit Component will be rendered here -->
                    </div>
                </div>
            </div>

            <div class="info">
                <p>
                    Check the Source Code to see the full implementation.
                </p>
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/developers/development-resources/test-cards/test-card-numbers#sepadirectdebit" target="_blank">SEPA Direct Debit test credentials</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/checkout/components-web/" target="_blank">Checkout Components documentation</a>.
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
    <script src="../demo.js"></script>
    <script src="../utils.js"></script>
    <script src="/sepa/sepa.js"></script>
</body>
</html>
