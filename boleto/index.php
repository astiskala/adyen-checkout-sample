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
            <a href="../">Back</a>

            <div class="checkout-container">
                <h1>Boleto Bancário Component</h1>
                <h2>Shopper Details Form</h2>
                <div class="payment-method">
                    <div id="boletobancario-container" class="payment-method__container">
                        <!-- Boleto Bancario Component will be rendered here -->
                    </div>
                </div>

                <h2>Payment Result (Voucher)</h2>
                <div class="payment-method">
                    <div id="boletobancario-result-container" class="payment-method__container">
                        <!-- The result of the payment action (voucher) will be rendered here  -->
                    </div>
                </div>
            </div>

            <h2>Configuration Options</h2>
            <div class="configuration-options">
              <form id="toggles">
                <h3>Component</h3>
                <label for="showPayButton">showPayButton:</label>
                <input type="checkbox" id="showPayButton" name="showPayButton" checked="checked" />
                <h3>Boleto Bancário Component</h3>
                <label for="personalDetailsRequired">personalDetailsRequired:</label>
                <input type="checkbox" id="personalDetailsRequired" name="personalDetailsRequired" checked="checked" /><br />
                <label for="billingAddressRequired">billingAddressRequired:</label>
                <input type="checkbox" id="billingAddressRequired" name="billingAddressRequired" checked="checked" /><br />
                <label for="showEmailAddress">showEmailAddress:</label>
                <input type="checkbox" id="showEmailAddress" name="showEmailAddress" checked="checked" />
                <h3>Locale Configuration</h3>
                <label for="locale">locale:</label>
                <input type="text" id="locale" name="locale" /><br />
                <label for="countryCode">countryCode:</label>
                <input type="text" id="countryCode" name="countryCode" /><br />
                <label for="currency">currency:</label>
                <input type="text" id="currency" name="currency" /><br />
                <label for="value">value:</label>
                <input type="text" id="value" name="value" /><br />
                <input type="button" id="reload" name="reload" value="Reload Component" />
              </form>
            </div>

            <div class="info">
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/development-resources/test-cards/test-card-numbers#boleto" target="_blank">Boleto Bancário test credentials</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/payment-methods/boleto-bancario/web-component" target="_blank">Boleto Bancário Component documentation</a>.
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
    <script src="/boleto/boleto.js"></script>
</body>
</html>
