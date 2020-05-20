const getConfig = async () => {
  const config = { afterpaytouchConfig: { amount: {} } };
  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let afterpaytouchComponent;

const loadComponent = function loadComponent() {
  getConfig().then((config) => {
    getOriginKey().then((originKey) => {
      getPaymentMethods().then((paymentMethodsResponse) => {
        const checkout = new AdyenCheckout({
          environment: config.environment,
          originKey,
          paymentMethodsResponse,
          locale: config.locale,
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
                makePayment(state.data).then((response) => {
                  if (response.action) {
                    afterpaytouchComponent.handleAction(response.action);
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
          .mount('#afterpaytouch-container');
      });
    });
  });
};

loadComponent();
