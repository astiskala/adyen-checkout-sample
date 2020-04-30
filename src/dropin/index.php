<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout Components sample code</title>
    <link rel="stylesheet" href="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.css">
    <link rel="stylesheet" href="../demo.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <div class="checkout-container">
                <a href="../">Back</a>

                <h1>Drop-in</h1>
                <div class="payment-method">
                    <div id="dropin-container">
                        <!-- Drop-in will be rendered here -->
                    </div>
                </div>

                <h2>Configuration Options</h2>
                <div class="configuration-options">
                  <form id="dropinToggles">
                    <h3>Drop-in</h3>
                    <label for="openFirstPaymentMethod">openFirstPaymentMethod:</label>
                    <input type="checkbox" id="openFirstPaymentMethod" name="openFirstPaymentMethod" checked="checked" /><br />
                    <label for="openFirstStoredPaymentMethod">openFirstStoredPaymentMethod:</label>
                    <input type="checkbox" id="openFirstStoredPaymentMethod" name="openFirstStoredPaymentMethod" checked="checked" /><br />
                    <label for="showStoredPaymentMethods">showStoredPaymentMethods:</label>
                    <input type="checkbox" id="showStoredPaymentMethods" name="showStoredPaymentMethods" checked="checked" /><br />
                    <label for="showPaymentMethods">showPaymentMethods:</label>
                    <input type="checkbox" id="showPaymentMethods" name="showPaymentMethods" checked="checked" /><br />
                    <label for="showPayButton">showPayButton:</label>
                    <input type="checkbox" id="showPayButton" name="showPayButton" checked="checked" />
                  </form>
                </div>
            </div>

            <div class="info">
                <p>
                    Check the Source Code to see the full implementation.
                </p>
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/developers/development-resources/test-cards/test-card-numbers" target="_blank">test card numbers</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/checkout/drop-in-web/" target="_blank">Drop-in documentation</a>.
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

    <script src="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.js"></script>
    <script src="../demo.js"></script>
    <script src="../utils.js"></script>
    <script src="/dropin/dropin.js"></script>
</body>
</html>
