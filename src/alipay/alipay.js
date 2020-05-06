const getConfig = async () => {
    let config = {};
    config.locale = await httpGet('env', 'SHOPPER_LOCALE');
    config.environment = await httpGet('env', 'ENVIRONMENT');
    return config;
};

var alipayComponent;

let loadComponent = function loadComponent() {
  getConfig().then(config => {
    getOriginKey().then(originKey => {
        getPaymentMethods().then(paymentMethodsResponse => {
        var checkout = new AdyenCheckout({
            environment: config.environment,
            originKey: originKey, // Mandatory. originKey from Customer Area
            paymentMethodsResponse,
            locale: config.locale
        });

        alipayComponent = checkout.create('alipay', {
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
        }).mount('#alipay-container');
      });
    });
  });
}

loadComponent();
