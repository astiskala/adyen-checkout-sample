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

                <h1>ACH Direct Debit Component</h1>
                <div class="payment-method">
                    <div id="ach-container" class="payment-method__container">
                        <!-- ACH Component will be rendered here -->
                    </div>
                </div>
            </div>

            <h2>Configuration Options</h2>
            <div class="configuration-options">
            <form id="toggles">
                <h3>ACH Direct Debit Component</h3>
                <label for="hasHolderName">hasHolderName:</label>
                <input type="checkbox" id="hasHolderName" name="hasHolderName" checked="checked" /><br />
                <label for="showPayButton">showPayButton:</label>
                <input type="checkbox" id="showPayButton" name="showPayButton" checked="checked" />
            </form>
            </div>

            <div class="info">
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/development-resources/test-cards/test-card-numbers#ach" target="_blank">ACH test credentials</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/payment-methods/ach-direct-debit/web-component" target="_blank">ACH Direct Debit Component documentation</a>.
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

    <script src="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js"></script>
    <script src="../assets/utils.js"></script>
    <script src="/ach/ach.js"></script>
</body>
</html>
