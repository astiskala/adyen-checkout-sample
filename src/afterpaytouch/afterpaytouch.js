const getConfig = async () => {
    let config = { afterpaytouchConfig: { environment: "test", amount: {} } };
    config.locale = await httpGet('env', 'SHOPPER_LOCALE');
    config.environment = await httpGet('env', 'ENVIRONMENT');
    return config;
};

var afterpaytouchComponent;

let loadComponent = function loadComponent() {
  getConfig().then(config => {
    // 0. Get originKey
    getOriginKey().then(originKey => {
        getPaymentMethods().then(paymentMethodsResponse => {
          // 1. Create an instance of AdyenCheckout
          var checkout = new AdyenCheckout({
              environment: config.environment,
              originKey: originKey, // Mandatory. originKey from Customer Area
              paymentMethodsResponse,
              locale: config.locale
          });

          // 2. Create and mount the Component
          afterpaytouchComponent = checkout.create('afterpaytouch', {
            onChange: (state, component) => {
                updateStateContainer(state);
            },
            onSelect: activeComponent => {
                updateStateContainer(activeComponent.data); // Demo purposes only
            },
            onSubmit: state => {
                updateStateContainer(state); // Demo purposes only
                if (state.isValid) {
                    makePayment(state.data)
                      .then(response => {
                        if (response.action) {
                          afterpaytouchComponent.handleAction(response.action);
                        } else {
                          if (response.resultCode) {
                            updateResultContainer(response.resultCode);
                          } else if (response.message) {
                            updateResultContainer(response.message);
                          }
                        }
                      });
                }
            },
            onAdditionalDetails: (state, component) => {
              submitAdditionalDetails(state.data)
                .then(result => {
                   updateResultContainer(result.resultCode);
                });
            }
        }).mount('#afterpaytouch-container');
        });
      });
  });
}

loadComponent();
