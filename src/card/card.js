const getConfig = async () => {
    let config = { cardConfig: { data: { billingAddress: {} } } };
    config.locale = await httpGet('env', 'SHOPPER_LOCALE');
    config.environment = await httpGet('env', 'ENVIRONMENT');

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

    return config;
};

var card;

let loadComponent = function loadComponent() {
  getConfig().then(config => {
    // 0. Get originKey
    getOriginKey().then(originKey => {
        getPaymentMethods().then(paymentMethodsResponse => {
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: config.environment,
            originKey: originKey,
            paymentMethodsResponse,
            locale: config.locale
        });

        // 2. Create and mount the Component
        card = checkout
            .create('card', {
                showPayButton: config.showPayButton,
                ...config.cardConfig,

                // Optional. Customize the look and feel of the payment form
                // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
                styles: {},

                // Optional. Define custom placeholders for the Card fields
                // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
                placeholders: {
                    // encryptedCardNumber: '9999 9999 9999 9999',
                    // encryptedExpiryDate: '01/22',
                    // encryptedSecurityCode : '123'
                },

                onSubmit: (state, component) => {
                    if (state.isValid) {
                        makePayment(card.data)
                          .then(response => {
                            if (response.action) {
                              component.handleAction(response.action);
                            } else {
                              if (response.resultCode) {
                                updateResultContainer(response.resultCode);
                              } else if (response.message) {
                                updateResultContainer(response.message);
                              }
                            }
                          });
                    }
                },
                onChange: (state, component) => {
                    updateStateContainer(state);
                },
                onAdditionalDetails: (state, component) => {
                  submitAdditionalDetails(state.data)
                    .then(result => {
                       updateResultContainer(result.resultCode);
                    });
                },
            })
            .mount('#card-container');
      });
    });
  });
}

loadComponent();

let reloadComponent = function reloadComponent() {
  card.unmount('#card-container');
  clearRequests();
  loadComponent();
}

let addReloadEventListener = function addReloadEventListener(element) {
  element.addEventListener('change', function() { reloadComponent(); });
}

let componentToggles = document.querySelectorAll('#componentToggles input');
componentToggles.forEach(addReloadEventListener);

let cardToggles = document.querySelectorAll('#cardToggles input');
cardToggles.forEach(addReloadEventListener);
