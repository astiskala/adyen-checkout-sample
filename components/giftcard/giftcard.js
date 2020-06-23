const getConfig = async () => {
  const config = { cardConfig: { data: { billingAddress: {} } } };
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.showPayButton = document.querySelector('#showPayButton').checked;

  config.cardConfig.data.holderName = await httpGet('env', 'CARD_HOLDERNAME');
  config.cardConfig.data.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');
  config.cardConfig.data.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
  config.cardConfig.data.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
  config.cardConfig.data.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
  config.cardConfig.data.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');
  config.cardConfig.data.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');

  return config;
};

let giftcardContainer;

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

          giftcardContainer = checkout
            .create('giftcard', {
              amount: localeConfig.amount,
              showPayButton: config.showPayButton,
              type: 'givex',
              pinRequired: true,

              onSubmit: (state, component) => {
                if (state.isValid) {
                  makePayment(localeConfig, giftcardContainer.data).then((response) => {
                    if (response.action) {
                      component.handleAction(response.action);
                    } else if (response.resultCode) {
                      updateResultContainer(response.resultCode);
                      if (giftcardContainer !== undefined) {
                        giftcardContainer.unmount('#giftcard-container');
                      }
                    } else if (response.message) {
                      updateResultContainer(response.message);
                      if (giftcardContainer !== undefined) {
                        giftcardContainer.unmount('#giftcard-container');
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
                  } else if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (giftcardContainer !== undefined) {
                      giftcardContainer.unmount('#giftcard-container');
                    }
                  } else if (response.message) {
                    updateResultContainer(response.message);
                    if (giftcardContainer !== undefined) {
                      giftcardContainer.unmount('#giftcard-container');
                    }
                  }
                });
              },
            })
            .mount('#giftcard-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (giftcardContainer !== undefined) {
    giftcardContainer.unmount('#giftcard-container');
  }

  clearRequests();
  loadComponent();
};
