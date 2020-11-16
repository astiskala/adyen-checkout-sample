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

  config.paypalConfig.intent = await httpGet('env', 'PAYPAL_INTENT');

  return config;
};

let dropin;

const loadDropIn = function loadDropIn() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        const checkout = new AdyenCheckout({
          environment: config.environment,
          clientKey: config.clientKey,
          paymentMethodsResponse: paymentMethodsResponse,
          locale: localeConfig.locale,
        });

        const paymentMethodsConfiguration = {
          applepay: config.applepayConfig,
          paypal: config.paypalConfig,
          card: config.cardConfig,
        };

        paymentMethodsConfiguration.applepay.amount = localeConfig.amount.value;
        paymentMethodsConfiguration.applepay.currencyCode = localeConfig.amount.currency;
        paymentMethodsConfiguration.applepay.countryCode = localeConfig.countryCode;

        /*paymentMethodsConfiguration.applepay.onSubmit = (state) => {
          makePayment(localeConfig, state.data, {}, true, config.native3ds2)
            .then((response) => {
              if (response.action) {
                dropin.handleAction(response.action);
              } else if (response.resultCode) {
                dropin.setStatus('success', { message: response.resultCode });
              } else if (response.message) {
                dropin.setStatus('success', { message: response.message });
              }
            })
            .catch((error) => {
              dropin.setStatus('error');
            });
        };*/

        paymentMethodsConfiguration.paypal.countryCode = localeConfig.countryCode;
        paymentMethodsConfiguration.paypal.amount = localeConfig.amount;

        paymentMethodsConfiguration.paypal.onCancel = (data, component) => {
          component.setStatus('ready');
        };

        paymentMethodsConfiguration.card.onBinValue = (state) => {
          console.log('onBinValue', state);
        };

        paymentMethodsConfiguration.card.onBrand = (state) => {
          console.log('onBrand', state);
        };

        dropin = checkout
          .create('dropin', {
            paymentMethodsConfiguration,
            openFirstPaymentMethod: config.openFirstPaymentMethod,
            openFirstStoredPaymentMethod: config.openFirstStoredPaymentMethod,
            showStoredPaymentMethods: config.showStoredPaymentMethods,
            showPaymentMethods: config.showPaymentMethods,
            amount: localeConfig.amount,
            showPayButton: config.showPayButton,
            showRemovePaymentMethodButton: config.showRemovePaymentMethodButton,
            onSelect: (activeComponent) => {
              updateStateContainer(activeComponent.data);
            },
            onChange: (state) => {
              updateStateContainer(state);
            },
            onSubmit: (state, component) => {
              makePayment(localeConfig, state.data, {}, true, config.native3ds2)
                .then((response) => {
                  if (response.action) {
                    dropin.handleAction(response.action);
                  } else if (response.resultCode) {
                    dropin.setStatus('success', { message: response.resultCode });
                  } else if (response.message) {
                    dropin.setStatus('success', { message: response.message });
                  }
                })
                .catch((error) => {
                  dropin.setStatus('error');
                });
            },
            onAdditionalDetails: (state, component) => {
              submitAdditionalDetails(state.data).then((response) => {
                if (response.action) {
                  dropin.handleAction(response.action);
                } else if (response.resultCode) {
                  dropin.setStatus('success', { message: response.resultCode });
                } else if (response.message) {
                  dropin.setStatus('success', { message: response.message });
                }
              });
            },
            onDisableStoredPaymentMethod: (storedPaymentMethodId, resolve, reject) => {
              var disableObject = {
                shopperReference: config.shopperReference,
                recurringDetailReference: storedPaymentMethodId.props.storedPaymentMethodId
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
            onError: (state, component) => {
              console.log('onError', state);
            },
          })
          .mount('#dropin-container');
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
