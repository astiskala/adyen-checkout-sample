const getConfig = async () => {
  const config = {
    cardConfig: { data: { billingAddress: {} } },
    paypalConfig: { environment: 'test', amount: {} },
    paymentMethod: {},
  };

  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.native3ds2 = document.querySelector('#native3ds2').checked;

  config.openFirstPaymentMethod = document.querySelector('#openFirstPaymentMethod').checked;
  config.openFirstStoredPaymentMethod = document.querySelector('#openFirstStoredPaymentMethod').checked;
  config.showStoredPaymentMethods = document.querySelector('#showStoredPaymentMethods').checked;
  config.showPaymentMethods = document.querySelector('#showPaymentMethods').checked;
  config.showPayButton = document.querySelector('#showPayButton').checked;

  config.cardConfig.enableStoreDetails = document.querySelector('#enableStoreDetails').checked;
  config.cardConfig.hasHolderName = document.querySelector('#hasHolderName').checked;
  config.cardConfig.holderNameRequired = document.querySelector('#holderNameRequired').checked;
  config.cardConfig.hideCVC = document.querySelector('#hideCVC').checked;
  config.cardConfig.showBrandIcon = document.querySelector('#showBrandIcon').checked;
  config.cardConfig.billingAddressRequired = document.querySelector('#billingAddressRequired').checked;
  config.cardConfig.data.holderName = await httpGet('env', 'CARD_HOLDERNAME');
  config.cardConfig.data.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');

  config.cardConfig.data.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
  config.cardConfig.data.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
  config.cardConfig.data.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
  config.cardConfig.data.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');
  config.cardConfig.data.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');

  config.paypalConfig.merchantId = await httpGet('env', 'PAYPAL_MERCHANT_ID');
  config.paypalConfig.countryCode = await httpGet('env', 'COUNTRY');
  config.paypalConfig.amount.currency = await httpGet('env', 'CURRENCY');
  config.paypalConfig.amount.value = await httpGet('env', 'VALUE');
  config.paypalConfig.intent = await httpGet('env', 'PAYPAL_INTENT');

  return config;
};

let dropin;

const loadDropIn = function loadDropIn() {
  getConfig().then((config) => {
    getOriginKey().then((originKey) => {
      getPaymentMethods().then((paymentMethodsResponse) => {
        const checkout = new AdyenCheckout({
          environment: config.environment,
          originKey,
          paymentMethodsResponse,
          locale: config.locale,
        });

        // 2. Handle any additional configuration required for specific payment methods
        const paymentMethodsConfiguration = {
          // Example required configuration for PayPal
          paypal: config.paypalConfig,
          card: config.cardConfig,
        };

        paymentMethodsConfiguration.paypal.onCancel = (data, component) => {
          component.setStatus('ready');
          // Sets your prefered status of the Drop-in component when a PayPal payment is cancelled.
          // In this example, return to the initial state.
        };

        // 3. Create and mount the Component
        dropin = checkout
          .create('dropin', {
            paymentMethodsConfiguration,
            openFirstPaymentMethod: config.openFirstPaymentMethod,
            openFirstStoredPaymentMethod: config.openFirstStoredPaymentMethod,
            showStoredPaymentMethods: config.showStoredPaymentMethods,
            showPaymentMethods: config.showPaymentMethods,
            showPayButton: config.showPayButton,
            // Events
            onSelect: (activeComponent) => {
              updateStateContainer(activeComponent.data);
            },
            onChange: (state) => {
              updateStateContainer(state);
            },
            onSubmit: (state, component) => {
              // state.data;
              // state.isValid;
              makePayment(state.data, {}, true, config.native3ds2)
                .then((response) => {
                  if (response.action) {
                    dropin.handleAction(response.action);
                  } else if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                  } else if (response.message) {
                    updateResultContainer(response.message);
                  }
                })
                .catch((error) => {
                  throw Error(error);
                });
            },
            onAdditionalDetails: (state, component) => {
              submitAdditionalDetails(state.data).then((result) => {
                if (result.action) {
                  // Drop-in handles the action object from the /payments/details response.
                  dropin.handleAction(result.action);
                } else {
                  updateResultContainer(result.resultCode);
                }
              });
            },
            onError: (state, component) => {
              // Sets your prefered status of Drop-in when an error occurs.
              // In this example, return to the initial state.
              dropin.setStatus('ready');
            },
          })
          .mount('#dropin-container');
      });
    });
  });
};

loadDropIn();

const reloadDropIn = function reloadDropIn() {
  dropin.unmount('#dropin-container');
  clearRequests();
  loadDropIn();
};

const addReloadEventListener = function addReloadEventListener(element) {
  element.addEventListener('change', () => {
    reloadDropIn();
  });
};

const toggles = document.querySelectorAll('#toggles input');
toggles.forEach(addReloadEventListener);
