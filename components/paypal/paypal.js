const getConfig = async () => {
  const config = { paypalConfig: { } };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');

  config.includeDeliveryAddress = document.querySelector('#includeDeliveryAddress').checked;

  config.paypalConfig.intent = await httpGet('env', 'PAYPAL_INTENT');
  return config;
};

let paypalComponent;

const loadComponent = function loadComponent() {
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

        const { paypalConfig } = config;
        paypalConfig.amount = localeConfig.amount;
        paypalConfig.countryCode = localeConfig.countryCode;

        paypalComponent = checkout
          .create('paypal', {
            ...paypalConfig,
            onSelect: (activeComponent) => {
              updateStateContainer(activeComponent.data);
            },
            onChange: (state) => {
              updateStateContainer(state);
            },
            onSubmit: (state, component) => {
              makePayment(localeConfig, state.data, {}, config.includeDeliveryAddress)
                .then((response) => {
                  if (response.action) {
                    paypalComponent.handleAction(response.action);
                  } else if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (paypalComponent !== undefined) {
                      paypalComponent.unmount('#paypal-container');
                    }
                  } else if (response.message) {
                    updateResultContainer(response.message);
                    if (paypalComponent !== undefined) {
                      paypalComponent.unmount('#paypal-container');
                    }
                  }
                })
                .catch((error) => {
                  throw Error(error);
                });
            },
            onAdditionalDetails: (state, component) => {
              submitAdditionalDetails(state.data).then((response) => {
                if (response.action) {
                  paypalComponent.handleAction(response.action);
                } else if (response.resultCode) {
                  updateResultContainer(response.resultCode);
                  if (paypalComponent !== undefined) {
                    paypalComponent.unmount('#paypal-container');
                  }
                } else if (response.message) {
                  updateResultContainer(response.message);
                  if (paypalComponent !== undefined) {
                    paypalComponent.unmount('#paypal-container');
                  }
                }
              });
            },
            onCancel: (data, component) => {
              component.setStatus('ready');
            },
            onError: (error, component) => {
              component.setStatus('error');
            },
          })
          .mount('#paypal-container');
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (paypalComponent !== undefined) {
    paypalComponent.unmount('#paypal-container');
  }

  clearRequests();
  loadComponent();
};
