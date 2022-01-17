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

  return config;
};

let dropin;

const loadDropIn = function loadDropIn() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getSessions(localeConfig).then((sessionsResponse) => {
        const paymentMethodsConfiguration = {
          applepay: config.applepayConfig,
          paypal: config.paypalConfig,
          card: config.cardConfig,
        };

        paymentMethodsConfiguration.applepay.amount = localeConfig.amount.value;
        paymentMethodsConfiguration.applepay.currencyCode = localeConfig.amount.currency;
        paymentMethodsConfiguration.applepay.countryCode = localeConfig.countryCode;

        paymentMethodsConfiguration.paypal.countryCode = localeConfig.countryCode;
        paymentMethodsConfiguration.paypal.amount = localeConfig.amount;

        paymentMethodsConfiguration.card.onBinValue = (state) => {
          console.log('onBinValue', state);
        };

        paymentMethodsConfiguration.card.onBrand = (state) => {
          console.log('onBrand', state);
        };

        (async function(){
          const checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            session: sessionsResponse,
            paymentMethodsConfiguration: paymentMethodsConfiguration,
            amount: localeConfig.amount,
            onPaymentCompleted: (result, component) => {
              console.log('onPaymentCompleted', result);
            },
            onError: (error) => {
              console.log('onError', error);
            },
          });

          dropin = checkout
            .create('dropin', {
              openFirstPaymentMethod: config.openFirstPaymentMethod,
              openFirstStoredPaymentMethod: config.openFirstStoredPaymentMethod,
              showStoredPaymentMethods: config.showStoredPaymentMethods,
              showPaymentMethods: config.showPaymentMethods,
              showPayButton: config.showPayButton,
              showRemovePaymentMethodButton: config.showRemovePaymentMethodButton,
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
