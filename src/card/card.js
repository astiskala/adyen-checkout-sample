const getConfig = async () => {
    let config = { cardConfig: {} };
    config.locale = await httpGet('env', 'SHOPPER_LOCALE');

    config.cardConfig.enableStoreDetails = document.querySelector('#enableStoreDetails').checked;
    config.cardConfig.hasHolderName = document.querySelector('#hasHolderName').checked;
    config.cardConfig.holderNameRequired = document.querySelector('#holderNameRequired').checked;
    config.cardConfig.hideCVC = document.querySelector('#hideCVC').checked;
    config.cardConfig.showBrandIcon = document.querySelector('#showBrandIcon').checked;
    config.cardConfig.billingAddressRequired = document.querySelector('#billingAddressRequired').checked;

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
            environment: 'test',
            originKey: originKey, // Mandatory. originKey from Customer Area
            paymentMethodsResponse,
            locale: config.locale
        });

        // 2. Create and mount the Component
        card = checkout
            .create('card', {
                ...config.cardConfig,

                // Optional Configuration
                // hasHolderName: true,

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

                // Optionally show a Pay Button
                showPayButton: true,

                // Events
                onSubmit: (state, component) => {
                    if (state.isValid) {
                        makePayment(card.data);
                    }
                },

                onChange: (state, component) => {
                    // state.data;
                    // state.isValid;

                    updateStateContainer(state); // Demo purposes only
                }
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

let cardToggles = document.querySelectorAll('#cardToggles input');
cardToggles.forEach(addReloadEventListener);
