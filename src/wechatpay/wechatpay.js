const getConfig = async () => {
    let config = { wechatConfig: { amount: {}, paymentMethod: { type: "wechatpayQR" } } };
    config.locale = await httpGet('env', 'SHOPPER_LOCALE');
    config.environment = await httpGet('env', 'ENVIRONMENT');

    config.wechatConfig.countryCode = await httpGet('env', 'COUNTRY');
    config.wechatConfig.amount.currency = await httpGet('env', 'CURRENCY');
    config.wechatConfig.amount.value = await httpGet('env', 'VALUE');

    return config;
};

var wechatpayComponent;

let loadComponent = function loadComponent() {
  getConfig().then(config => {
    getOriginKey().then(originKey => {
        getPaymentMethods().then(paymentMethodsResponse => {
          // 1. Create an instance of AdyenCheckout providing an originKey
          const checkout = new AdyenCheckout({
              environment: config.environment,
              originKey: originKey, // Mandatory. originKey from Customer Area
              amount: { currency: 'CNY', value: 1000 }, // amount to be shown next to the qrcode
              paymentMethodsResponse,
              locale: config.locale
          });

        /** Call the /payments endpoint to retrieve the necessary data to start the Wechat Pay component
         *  We need the following parts of the response
         *  - qrCodeData (redirect.data.qrCodeData): The data the QR Code will contain
         *  - paymentData Necessary to communicate with Adyen to check the current payment status
         */
        makePayment(config.wechatConfig).then(response => {
          if (!!response.action) {
              // 2. Create and mount the Component from the action received
              wechatpayComponent = checkout.createFromAction(response.action).mount('#wechatpay-container');
          }
        });
      });
    });
  });
}

loadComponent();
