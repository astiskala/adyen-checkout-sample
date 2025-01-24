const getConfig = async () => {
  const config = {
    cardConfig: { data: { billingAddress: {} } },
    applepayConfig: { },
    paypalConfig: { environment: 'test', amount: {} },
    paymentMethod: {},
  };

  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');

  config.native3ds2 = document.querySelector('#native3ds2').checked;

  config.openFirstPaymentMethod = document.querySelector('#openFirstPaymentMethod').checked;
  config.openFirstStoredPaymentMethod = document.querySelector('#openFirstStoredPaymentMethod').checked;
  config.showStoredPaymentMethods = document.querySelector('#showStoredPaymentMethods').checked;
  config.showPaymentMethods = document.querySelector('#showPaymentMethods').checked;
  config.showPayButton = document.querySelector('#showPayButton').checked;
  config.showRemovePaymentMethodButton = document.querySelector('#showRemovePaymentMethodButton').checked;

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

  config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');
  //config.shopperEmail = await httpGet('env', 'SHOPPER_EMAIL');

  return config;
};

let checkout;
let dropin;

const loadDropIn = function loadDropIn() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        const paymentMethodsConfiguration = {
          applepay: config.applepayConfig,
          paypal: config.paypalConfig,
          card: config.cardConfig,
        };

        paymentMethodsConfiguration.applepay.amount = localeConfig.amount;
        paymentMethodsConfiguration.applepay.countryCode = localeConfig.countryCode;

        paymentMethodsConfiguration.applepay.onSubmit = (state, component) => {
          dropin.setStatus('loading');
          makePayment(localeConfig, state.data, {}, true, config.native3ds2)
            .then((response) => {
              dropin.setStatus('ready');
              if (response.action) {
                dropin.handleAction(response.action);
              } else if (response.resultCode) {
                dropin.setStatus('success', { message: response.resultCode });
              } else if (response.message) {
                dropin.setStatus('success', { message: response.message });
              }
            })
            .catch((error) => {
              dropin.setStatus('ready');
              dropin.setStatus('error');
              console.log('onError', error);
            });
        };

        paymentMethodsConfiguration.paypal.countryCode = localeConfig.countryCode;
        paymentMethodsConfiguration.paypal.amount = localeConfig.amount;

        paymentMethodsConfiguration.paypal.onCancel = (data, component) => {
          component.setStatus('ready');
        };

        paymentMethodsConfiguration.card.clickToPayConfiguration = {
          merchantDisplayName: 'Test Merchant',
          shopperEmail: config.shopperEmail
        };

        paymentMethodsConfiguration.card.onBinValue = (state) => {
          console.log('onBinValue', state);
        };

        paymentMethodsConfiguration.card.onBinLookup = (state) => {
          console.log('onBinLookup', state);
        };

        paymentMethodsConfiguration.card.onBrand = (state) => {
          console.log('onBrand', state);
        };

        (async function(){
          const { AdyenCheckout, Dropin } = window.AdyenWeb;
          checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            locale: localeConfig.locale,
            countryCode: localeConfig.countryCode,
            amount: localeConfig.amount,
            onSubmit: (state, component) => {
              dropin.setStatus('loading');
              makePayment(localeConfig, state.data, {}, true, config.native3ds2)
                .then((response) => {
                  dropin.setStatus('ready');
                  if (response.action) {
                    dropin.handleAction(response.action);
                  } else if (response.resultCode) {
                    dropin.setStatus('success', { message: response.resultCode });
                  } else if (response.message) {
                    dropin.setStatus('success', { message: response.message });
                  }
                })
                .catch((error) => {
                  dropin.setStatus('ready');
                  dropin.setStatus('error');
                  console.log('onError', error);
                });
            },
            onAdditionalDetails: (state, component) => {
              dropin.setStatus('loading');
              submitAdditionalDetails(state.data).then((response) => {
                dropin.setStatus('ready');
                if (response.action) {
                  dropin.handleAction(response.action);
                } else if (response.resultCode) {
                  dropin.setStatus('success', { message: response.resultCode });
                } else if (response.message) {
                  dropin.setStatus('success', { message: response.message });
                }
              });
            },
            onError: (state, component) => {
              console.log('onError', state);
            },
            onChange: (state) => {
              console.log('onChange', state);
              updateStateContainer(state);
            },
          });

          dropin = new Dropin(checkout, {
              paymentMethodsConfiguration: paymentMethodsConfiguration,
              openFirstPaymentMethod: config.openFirstPaymentMethod,
              openFirstStoredPaymentMethod: config.openFirstStoredPaymentMethod,
              showStoredPaymentMethods: config.showStoredPaymentMethods,
              showPaymentMethods: config.showPaymentMethods,
              showPayButton: config.showPayButton,
              showRemovePaymentMethodButton: config.showRemovePaymentMethodButton,
              instantPaymentTypes: [ 'googlepay', 'paywithgoogle', 'applepay' ],
              onSelect: (activeComponent) => {
                console.log('onSelect', activeComponent);
                updateStateContainer(activeComponent.data);
              },
              onDisableStoredPaymentMethod: (storedPaymentMethodId, resolve, reject) => {
                const disableObject = {
                  shopperReference: config.shopperReference,
                  recurringDetailReference: storedPaymentMethodId
                };

                disable(disableObject).then((response) => {
                  if (response.response === '[detail-successfully-disabled]') {
                    resolve();
                  }
                  else {
                    reject();
                  }
                });
              },
            })
            .mount('#dropin-container');
        })()
      });
    });
  });
};

loadDropIn();

const reload = function reload() {
  if (dropin !== undefined) {
    dropin.unmount('#dropin-container');
  }

  clearRequests();
  loadDropIn();
};
