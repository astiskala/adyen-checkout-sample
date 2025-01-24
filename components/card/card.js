const getConfig = async () => {
  const config = { cardConfig: { data: { billingAddress: {} } } };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');

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
  
  config.shopperEmail = await httpGet('env', 'SHOPPER_EMAIL');

  return config;
};

let card;
let storedCard;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        (async function(){
          const { AdyenCheckout, Card } = window.AdyenWeb;
          const checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            locale: localeConfig.locale,
            countryCode: localeConfig.countryCode,
          });

          const storedPaymentMethod = checkout.paymentMethodsResponse.storedPaymentMethods[1];
          storedCard = new Card(checkout, storedPaymentMethod).mount("#stored-card");

          card = new Card(checkout, {
              amount: localeConfig.amount,
              showPayButton: config.showPayButton,
              ...config.cardConfig,
              clickToPayConfiguration: {
                merchantDisplayName: 'Test Merchant',
                shopperEmail: config.shopperEmail
              },
              onSubmit: (state, component) => {
                if (state.isValid) {
                  makePayment(localeConfig, card.data, {}, true, config.native3ds2)
                    .then((response) => {
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
                console.log('onChange', state);
              },
              onBinValue: (state) => {
                console.log('onBinValue', state);
              },
              onBinLookup: (state) => {
                console.log('onBinLookup', state);
              },
              onFieldValid: (state) => {
                console.log('onFieldValid', state);
              },
              onFocus: (state) => {
                console.log('onFocus', state);
              },
              onError: (state) => {
                console.log('onError', state);
              },
              onAdditionalDetails: (state, component) => {
                submitAdditionalDetails(state.data).then((result) => {
                  if (result.action) {
                    component.handleAction(result.action);
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
              },
            })
            .mount('#card-container');
        })()
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
