const getConfig = async () => {
  const config = {
    wechatConfig: { amount: {}, paymentMethod: { type: 'wechatpayQR' } },
  };
  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.wechatConfig.countryCode = await httpGet('env', 'COUNTRY');
  config.wechatConfig.amount.currency = await httpGet('env', 'CURRENCY');
  config.wechatConfig.amount.value = await httpGet('env', 'VALUE');

  return config;
};

let wechatpayComponent;

const loadComponent = function loadComponent() {
  getConfig().then((config) => {
    getOriginKey().then((originKey) => {
      getPaymentMethods().then((paymentMethodsResponse) => {
        const checkout = new AdyenCheckout({
          environment: config.environment,
          originKey,
          amount: config.wechatConfig.amount,
          paymentMethodsResponse,
          locale: config.locale,
        });

        /** Call the /payments endpoint to retrieve the data to start the Wechat Pay component
         *  We need the following parts of the response
         *  - qrCodeData (redirect.data.qrCodeData): The data the QR Code will contain
         *  - paymentData Necessary to communicate with Adyen to check the current payment status
         */
        makePayment(config.wechatConfig).then((response) => {
          if (response.action) {
            // 2. Create and mount the Component from the action received
            wechatpayComponent = checkout
              .createFromAction(response.action)
              .mount('#wechatpay-container');
          }
        });
      });
    });
  });
};

loadComponent();
