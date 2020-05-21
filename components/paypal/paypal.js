const getConfig = async () => {
  const config = { paypalConfig: { } };
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.includeDeliveryAddress = document.querySelector('#includeDeliveryAddress').checked;

  config.paypalConfig.environment = await httpGet('env', 'ENVIRONMENT');
  config.paypalConfig.merchantId = await httpGet('env', 'PAYPAL_MERCHANT_ID');
  config.paypalConfig.intent = await httpGet('env', 'PAYPAL_INTENT');
  return config;
};

let paypalComponent;

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

          const paypalConfig = config.paypalConfig;
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
                      component.handleAction(response.action);
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
                  updateResultContainer(result.resultCode);
                  paypalComponent.unmount('#paypal-container');
                });
              },
              onCancel: (data, component) => {
                component.setStatus('ready');
              },
              onError: (error, component) => {
                component.setStatus('ready');
              },
            })
            .mount('#paypal-container');
        });
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
