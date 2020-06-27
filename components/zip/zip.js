const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let zipComponent;

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

          zipComponent = checkout
            .create('zip', {
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
                      zipComponent.handleAction(response.action);
                    } else if (response.resultCode) {
                      updateResultContainer(response.resultCode);
                      if (zipComponent !== undefined) {
                        zipComponent.unmount('#zip-container');
                      }
                    } else if (response.message) {
                      updateResultContainer(response.message);
                      if (zipComponent !== undefined) {
                        zipComponent.unmount('#zip-container');
                      }
                    }
                  });
                }
              },
              onAdditionalDetails: (state, component) => {
                submitAdditionalDetails(state.data).then((result) => {
                  if (response.action) {
                    zipComponent.handleAction(response.action);
                  } else if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (zipComponent !== undefined) {
                      zipComponent.unmount('#zip-container');
                    }
                  } else if (response.message) {
                    updateResultContainer(response.message);
                    if (zipComponent !== undefined) {
                      zipComponent.unmount('#zip-container');
                    }
                  }
                });
              },
            })
            .mount('#zip-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (zipComponent !== undefined) {
    zipComponent.unmount('#zip-container');
  }

  clearRequests();
  loadComponent();
};
