<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.css">
    <link rel="stylesheet" href="../../assets/style.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../../">Back</a>

            <div class="checkout-container">
                <h1>SEPA Direct Debit Component</h1>
                <div class="payment-method">
                    <div id="sepa-container" class="payment-method__container">
                        <!-- SEPA Direct Debit Component will be rendered here -->
                    </div>
                </div>
            </div>

            <h2>Configuration Options</h2>
            <div class="configuration-options">
              <form id="toggles">
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
                    To make a payment, use our <a href="https://docs.adyen.com/development-resources/test-cards/test-card-numbers#sepa-direct-debit" target="_blank">SEPA Direct Debit test credentials</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/payment-methods/sepa-direct-debit/web-component" target="_blank">SEPA Direct Debit Component documentation</a>.
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

    <script src="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.js"></script>
    <script src="../../assets/utils.js"></script>
    <script src="sepa.js"></script>
</body>
</html>
