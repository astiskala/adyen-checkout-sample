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

                <h1>Drop-in</h1>
                <div class="payment-method">
                    <div id="dropin-container">
                        <!-- Drop-in will be rendered here -->
                    </div>
                </div>

                <h2>Configuration Options</h2>
                <div class="configuration-options">
                  <form id="toggles">
                    <h3>3DS2</h3>
                    <label for="native3ds2">Enable Native 3DS2:</label>
                    <input type="checkbox" id="native3ds2" name="native3ds2" checked="checked" />
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
                    <h3>Cards Component</h3>
                    <label for="enableStoreDetails">enableStoreDetails:</label>
                    <input type="checkbox" id="enableStoreDetails" name="enableStoreDetails" /><br />
                    <label for="hasHolderName">hasHolderName:</label>
                    <input type="checkbox" id="hasHolderName" name="hasHolderName" /><br />
                    <label for="holderNameRequired">holderNameRequired:</label>
                    <input type="checkbox" id="holderNameRequired" name="holderNameRequired" /><br />
                    <label for="hideCVC">hideCVC:</label>
                    <input type="checkbox" id="hideCVC" name="hideCVC" /><br />
                    <label for="showBrandIcon">showBrandIcon:</label>
                    <input type="checkbox" id="showBrandIcon" name="showBrandIcon" checked="checked" /><br />
                    <label for="billingAddressRequired">billingAddressRequired:</label>
                    <input type="checkbox" id="billingAddressRequired" name="billingAddressRequired" />
                  </form>
                </div>
            </div>

            <div class="info">
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/development-resources/test-cards/test-card-numbers" target="_blank">test card numbers</a>.
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

    <script src="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.js"></script>
    <script src="../assets/utils.js"></script>
    <script src="/dropin/dropin.js"></script>
</body>
</html>
