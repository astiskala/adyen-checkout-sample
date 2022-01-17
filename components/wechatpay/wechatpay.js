const getConfig = async () => {
  const config = {
    wechatConfig: { paymentMethod: { type: 'wechatpayQR' } },
  };

  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  return config;
};

let wechatpayComponent;

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
            onAdditionalDetails: (state, component) => {
              submitAdditionalDetails(state.data).then((result) => {
                if (response.action) {
                  component.handleAction(result.action);
                } else if (response.resultCode) {
                  updateResultContainer(response.resultCode);
                  if (wechatpayComponent !== undefined) {
                    wechatpayComponent.unmount('#wechatpay-container');
                  }
                } else if (response.message) {
                  updateResultContainer(response.message);
                  if (wechatpayComponent !== undefined) {
                    wechatpayComponent.unmount('#wechatpay-container');
                  }
                }
              });
            },
          });

          makePayment(localeConfig, config.wechatConfig).then((response) => {
            if (response.action) {
              wechatpayComponent = checkout.createFromAction(response.action).mount('#wechatpay-container');
            } else if (response.resultCode) {
              updateResultContainer(response.resultCode);
              if (wechatpayComponent !== undefined) {
                wechatpayComponent.unmount('#wechatpay-container');
              }
            } else if (response.message) {
              updateResultContainer(response.message);
              if (wechatpayComponent !== undefined) {
                wechatpayComponent.unmount('#wechatpay-container');
              }
            }
          });
        })()
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (wechatpayComponent !== undefined) {
    wechatpayComponent.unmount('#wechatpay-container');
  }

  clearRequests();
  loadComponent();
};
