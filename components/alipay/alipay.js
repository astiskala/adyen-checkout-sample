const getConfig = async () => {
  const config = {};
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  return config;
};

let alipayComponent;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        (async function(){
          const checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            locale: localeConfig.locale,
          });

          alipayComponent = checkout
            .create('alipay', {
              onChange: (state) => {
                updateStateContainer(state);
              },
              onSubmit: (state, component) => {
                makePayment(localeConfig, state.data)
                  .then((response) => {
                    if (response.action) {
                      component.handleAction(response.action);
                    } else if (response.resultCode) {
                      updateResultContainer(response.resultCode);
                      if (alipayComponent !== undefined) {
                        alipayComponent.unmount('#alipay-container');
                      }
                    } else if (response.message) {
                      updateResultContainer(response.message);
                      if (alipayComponent !== undefined) {
                        alipayComponent.unmount('#alipay-container');
                      }
                    }
                  })
                  .catch((error) => {
                    throw Error(error);
                  });
              },
            })
            .mount('#alipay-container');
        })()
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (alipayComponent !== undefined) {
    alipayComponent.unmount('#alipay-container');
  }

  clearRequests();
  loadComponent();
};
