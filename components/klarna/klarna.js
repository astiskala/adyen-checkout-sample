const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let klarnaComponent;

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
                    } else if (response.message) {
                      updateResultContainer(response.message);
                    }
                  });
                }
              },
              onAdditionalDetails: (state, component) => {
                submitAdditionalDetails(state.data).then((result) => {
                  updateResultContainer(result.resultCode);
                });
              },
            })
            .mount('#klarna-container');
        });
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
