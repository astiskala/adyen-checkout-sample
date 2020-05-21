const getConfig = async () => {
  const config = {
    wechatConfig: { paymentMethod: { type: 'wechatpayQR' } },
  };

  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let wechatpayComponent;

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

          /** Call the /payments endpoint to retrieve the data to start the Wechat Pay component
           *  We need the following parts of the response
           *  - qrCodeData (redirect.data.qrCodeData): The data the QR Code will contain
           *  - paymentData Necessary to communicate with Adyen to check the current payment status
           */
          makePayment(localeConfig, config.wechatConfig).then((response) => {
            if (response.action) {
              wechatpayComponent = checkout
                .createFromAction(response.action)
                .mount('#wechatpay-container');
            }
          });
        });
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
