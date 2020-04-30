const getConfig = async () => {
    let config = { paypalConfig: { environment: "test", amount: {} } };
    config.locale = await httpGet('env', 'SHOPPER_LOCALE');

    config.paypalConfig.merchantId = await httpGet('env', 'PAYPAL_MERCHANT_ID');
    config.paypalConfig.countryCode = await httpGet('env', 'COUNTRY');
    config.paypalConfig.amount.currency = await httpGet('env', 'CURRENCY');
    config.paypalConfig.amount.value = await httpGet('env', 'VALUE');
    config.paypalConfig.intent = await httpGet('env', 'PAYPAL_INTENT');
    return config;
};

var paypalComponent;

let loadComponent = function loadComponent() {
  getConfig().then(config => {
    // 0. Get originKey
    getOriginKey().then(originKey => {
          // 1. Create an instance of AdyenCheckout
          var checkout = new AdyenCheckout({
              environment: 'test',
              originKey: originKey, // Mandatory. originKey from Customer Area
              locale: config.locale
          });

          // 2. Create and mount the Component
          paypalComponent = checkout
              .create('paypal', {
                  ...config.paypalConfig,
                  // Events
                  onSelect: activeComponent => {
                      updateStateContainer(activeComponent.data); // Demo purposes only
                  },
                  onChange: state => {
                      updateStateContainer(state); // Demo purposes only
                  },
                  onSubmit: (state, component) => {
                      // state.data;
                      // state.isValid;
                      makePayment(state.data)
                        .then(response => {
                          if (response.action) {
                            // Drop-in handles the action object from the /payments response.
                            component.handleAction(response.action);
                          } else {
                            if (response.resultCode) {
                              updateResultContainer(response.resultCode);
                            } else if (response.message) {
                              updateResultContainer(response.message);
                            }
                          }
                        })
                        .catch(error => {
                          throw Error(error);
                        });
                  },
                  onAdditionalDetails: (state, component) => {
                    submitAdditionalDetails(state.data)
                      .then(result => {
                         updateResultContainer(result.resultCode);
                         paypalComponent.unmount('#paypal-container');
                      });
                  },
                  onCancel: (data, component) => {
                      // Sets your prefered status of the component when a PayPal payment is cancelled. In this example, return to the initial state.
                      component.setStatus('ready');
                  },
                  onError: (error, component) => {
                     // Sets your prefered status of Drop-in when an error occurs. In this example, return to the initial state.
                     component.setStatus('ready');
                  }
              })
              .mount('#paypal-container');
      });
  });
}

loadComponent();
