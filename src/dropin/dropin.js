const getPaypalConfig = async () => {
    let config = { environment: "test", amount: {} };
    config.merchantId = await httpGet('env', 'PAYPAL_MERCHANT_ID');
    config.countryCode = await httpGet('env', 'COUNTRY');
    config.amount.currency = await httpGet('env', 'CURRENCY');
    config.amount.value = await httpGet('env', 'VALUE');
    config.intent = await httpGet('env', 'PAYPAL_INTENT');
    return config;
};

getPaypalConfig().then(paypalConfig => {
  // 0. Get originKey
  getOriginKey().then(originKey => {
      getPaymentMethods().then(paymentMethodsResponse => {
          // 1. Create an instance of AdyenCheckout
          const checkout = new AdyenCheckout({
              environment: 'test',
              originKey: originKey, // Mandatory. originKey from Customer Area
              paymentMethodsResponse
          });

          // 2. Handle any additional configuration required for specific payment methods
          let paymentMethodsConfiguration = { // Example required configuration for PayPal
            paypal: paypalConfig
          };

          paymentMethodsConfiguration.paypal.onCancel = (data, dropin) => {
            dropin.setStatus('ready');
            // Sets your prefered status of the Drop-in component when a PayPal payment is cancelled. In this example, return to the initial state.
          }

          // 3. Create and mount the Component
          const dropin = checkout
              .create('dropin', {
                  paymentMethodsConfiguration: paymentMethodsConfiguration,
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
                            dropin.handleAction(response.action);
                          }
                        })
                        .catch(error => {
                          throw Error(error);
                        });
                  }
              })
              .mount('#dropin-container');
      });
  });
});
