const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  return config;
};

let afterpaytouchComponent;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getOriginKey().then((originKey) => {
        getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
          const checkout = new AdyenCheckout({
            environment: config.environment,
            originKey: originKey,
            clientKey: config.clientKey,
            ...paymentMethodsResponse,
            locale: localeConfig.locale,
          });

          afterpaytouchComponent = checkout
            .create('afterpaytouch', {
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
                      afterpaytouchComponent.handleAction(response.action);
                    } else if (response.resultCode) {
                      updateResultContainer(response.resultCode);
                      if (afterpaytouchComponent !== undefined) {
                        afterpaytouchComponent.unmount('#afterpaytouch-container');
                      }
                    } else if (response.message) {
                      updateResultContainer(response.message);
                      if (afterpaytouchComponent !== undefined) {
                        afterpaytouchComponent.unmount('#afterpaytouch-container');
                      }
                    }
                  });
                }
              },
              onAdditionalDetails: (state, component) => {
                submitAdditionalDetails(state.data).then((result) => {
                  if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (afterpaytouchComponent !== undefined) {
                      afterpaytouchComponent.unmount('#afterpaytouch-container');
                    }
                  } else if (response.message) {
                    updateResultContainer(response.message);
                    if (afterpaytouchComponent !== undefined) {
                      afterpaytouchComponent.unmount('#afterpaytouch-container');
                    }
                  }
                });
              },
            })
            .mount('#afterpaytouch-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (afterpaytouchComponent !== undefined) {
    afterpaytouchComponent.unmount('#afterpaytouch-container');
  }

  clearRequests();
  loadComponent();
};
