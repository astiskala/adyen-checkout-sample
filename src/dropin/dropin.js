const getConfig = async () => {
    let config = { paypalConfig: { environment: "test", amount: {} } };
    config.locale = await httpGet('env', 'SHOPPER_LOCALE');

    config.openFirstPaymentMethod = document.querySelector('#openFirstPaymentMethod').checked;
    config.openFirstStoredPaymentMethod = document.querySelector('#openFirstStoredPaymentMethod').checked;
    config.showStoredPaymentMethods = document.querySelector('#showStoredPaymentMethods').checked;
    config.showPaymentMethods = document.querySelector('#showPaymentMethods').checked;
    config.showPayButton = document.querySelector('#showPayButton').checked;

    config.paypalConfig.merchantId = await httpGet('env', 'PAYPAL_MERCHANT_ID');
    config.paypalConfig.countryCode = await httpGet('env', 'COUNTRY');
    config.paypalConfig.amount.currency = await httpGet('env', 'CURRENCY');
    config.paypalConfig.amount.value = await httpGet('env', 'VALUE');
    config.paypalConfig.intent = await httpGet('env', 'PAYPAL_INTENT');
    return config;
};

var dropin;

let loadDropIn = function loadDropIn() {
  getConfig().then(config => {
    // 0. Get originKey
    getOriginKey().then(originKey => {
        getPaymentMethods().then(paymentMethodsResponse => {
            // 1. Create an instance of AdyenCheckout
            var checkout = new AdyenCheckout({
                environment: 'test',
                originKey: originKey, // Mandatory. originKey from Customer Area
                paymentMethodsResponse,
                locale: config.locale
            });

            // 2. Handle any additional configuration required for specific payment methods
            let paymentMethodsConfiguration = { // Example required configuration for PayPal
              paypal: config.paypalConfig
            };

            paymentMethodsConfiguration.paypal.onCancel = (data, dropin) => {
              dropin.setStatus('ready');
              // Sets your prefered status of the Drop-in component when a PayPal payment is cancelled. In this example, return to the initial state.
            }

            // 3. Create and mount the Component
            dropin = checkout
                .create('dropin', {
                    paymentMethodsConfiguration: paymentMethodsConfiguration,
                    openFirstPaymentMethod: config.openFirstPaymentMethod,
                    openFirstStoredPaymentMethod: config.openFirstStoredPaymentMethod,
                    showStoredPaymentMethods: config.showStoredPaymentMethods,
                    showPaymentMethods: config.showPaymentMethods,
                    showPayButton: config.showPayButton,
                    // Events
                    onSelect: activeComponent => {
                        updateStateContainer(activeComponent.data); // Demo purposes only
                    },
                    onChange: state => {
                        updateStateContainer(state); // Demo purposes only
                    },
                    onSubmit: (state, component) => {
                        // state.data;
                        // state.isValid;
                        makePayment(state.data)
                          .then(response => {
                            if (response.action) {
                              // Drop-in handles the action object from the /payments response.
                              dropin.handleAction(response.action);
                            } else {
                              if (response.resultCode) {
                                updateResultContainer(response.resultCode);
                              } else if (response.message) {
                                updateResultContainer(response.message);
                              }
                            }
                          })
                          .catch(error => {
                            throw Error(error);
                          });
                    },
                    onAdditionalDetails: (state, component) => {
                      submitAdditionalDetails(state.data)
                        .then(result => {
                           updateResultContainer(result.resultCode);
                        });
                    },
                    onError: (state, dropin) => {
                       // Sets your prefered status of Drop-in when an error occurs. In this example, return to the initial state.
                       dropin.setStatus('ready');
                    }
                })
                .mount('#dropin-container');
        });
    });
  });
}

loadDropIn();

let reloadDropIn = function reloadDropIn() {
  dropin.unmount('#dropin-container');
  loadDropIn();
}

let addReloadEventListener = function addReloadEventListener(element) {
  element.addEventListener('change', function() { reloadDropIn(); });
}

let toggles = document.querySelectorAll('#dropinToggles input');
toggles.forEach(addReloadEventListener);
