<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.css">
    <link rel="stylesheet" href="../demo.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <div class="checkout-container">
                <a href="../">Back</a>

                <h1>AfterPay Touch Component</h1>
                <div class="payment-method">
                    <div id="afterpaytouch-container">
                        <!-- Component will be rendered here -->
                    </div>
                </div>
            </div>

            <div class="info">
                <p>
                    Check the Source Code to see the full implementation.
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
    <script src="../utils.js"></script>
    <script src="/afterpaytouch/afterpaytouch.js"></script>
</body>
</html>
