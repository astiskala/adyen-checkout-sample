const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  return config;
};

let klarnaComponent;

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

        klarnaComponent = checkout
          .create('klarna', {
            onChange: (state, component) => {
              updateStateContainer(state);
            },
            onSelect: (activeComponent) => {
              updateStateContainer(activeComponent.data);
            },
            onSubmit: (state) => {
              updateStateContainer(state);
              if (state.isValid) {
                makePayment(localeConfig, state.data).then((response) => {
                  if (response.action) {
                    klarnaComponent.handleAction(response.action);
                  } else if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (klarnaComponent !== undefined) {
                      klarnaComponent.unmount('#klarna-container');
                    }
                  } else if (response.message) {
                    updateResultContainer(response.message);
                    if (klarnaComponent !== undefined) {
                      klarnaComponent.unmount('#klarna-container');
                    }
                  }
                });
              }
            },
            onAdditionalDetails: (state, component) => {
              submitAdditionalDetails(state.data).then((response) => {
                if (response.action) {
                  klarnaComponent.handleAction(response.action);
                } else if (response.resultCode) {
                  updateResultContainer(response.resultCode);
                  if (klarnaComponent !== undefined) {
                    klarnaComponent.unmount('#klarna-container');
                  }
                } else if (response.message) {
                  updateResultContainer(response.message);
                  if (klarnaComponent !== undefined) {
                    klarnaComponent.unmount('#klarna-container');
                  }
                }
              });
            },
          })
          .mount('#klarna-container');
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (klarnaComponent !== undefined) {
    klarnaComponent.unmount('#klarna-container');
  }

  clearRequests();
  loadComponent();
};
