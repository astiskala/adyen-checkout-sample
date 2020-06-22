const getConfig = async () => {
  const config = { cardConfig: { data: { billingAddress: {} } } };
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.native3ds2 = document.querySelector('#native3ds2').checked;
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

let card;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getOriginKey().then((originKey) => {
        getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
          const checkout = new AdyenCheckout({
            environment: config.environment,
            originKey,
            paymentMethodsResponse,
            locale: localeConfig.locale,
          });

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
                  makePayment(localeConfig, card.data, {}, true, config.native3ds2).then((response) => {
                    if (response.action) {
                      component.handleAction(response.action);
                    } else if (response.resultCode) {
                      updateResultContainer(response.resultCode);
                      if (card !== undefined) {
                        card.unmount('#card-container');
                      }
                    } else if (response.message) {
                      updateResultContainer(response.message);
                      if (card !== undefined) {
                        card.unmount('#card-container');
                      }
                    }
                  });
                }
              },
              onChange: (state, component) => {
                updateStateContainer(state);
              },
              onAdditionalDetails: (state, component) => {
                submitAdditionalDetails(state.data).then((result) => {
                  if (result.action) {
                    component.handleAction(result.action);
                  } else {
                    updateResultContainer(result.resultCode);
                    if (card !== undefined) {
                      card.unmount('#card-container');
                    }
                  }
                });
              },
            })
            .mount('#card-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (card !== undefined) {
    card.unmount('#card-container');
  }

  clearRequests();
  loadComponent();
};
