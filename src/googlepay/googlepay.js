const getConfig = async () => {
  let config = {
    googlePayConfig: {
      configuration: { merchantName: "Adyen Test" },
      amount: {},
    },
  };
  config.locale = await httpGet("env", "SHOPPER_LOCALE");
  config.environment = await httpGet("env", "ENVIRONMENT");

  var adyenEnvironment = await httpGet("env", "ENVIRONMENT");
  if (adyenEnvironment === "test") {
    config.googlePayConfig.environment = "TEST";
  } else if (adyenEnvironment === "live") {
    config.googlePayConfig.environment = "PRODUCTION";
  }

  config.googlePayConfig.configuration.gatewayMerchantId = await httpGet(
    "env",
    "MERCHANT_ACCOUNT"
  );
  config.googlePayConfig.amount.currency = await httpGet("env", "CURRENCY");
  config.googlePayConfig.amount.value = await httpGet("env", "VALUE");
  return config;
};

var googlepayComponent;

let loadComponent = function loadComponent() {
  getConfig().then((config) => {
    var checkout = new AdyenCheckout({
      environment: config.environment,
      locale: config.locale,
    });

    // 2. Create and mount the Component
    googlepayComponent = checkout
      .create("paywithgoogle", {
        showPayButton: true,
        ...config.googlePayConfig,

        // Events
        onSubmit: (state, component) => {
          // Submit Payment
          makePayment(state.data);
          updateStateContainer(state); // Demo purposes only
        },
        onError: (error) => {
          console.error(error);
        },
      })
      // Normally, you should check if Google Pay is available before mounting it.
      // Here we are mounting it directly for demo purposes.
      // Please refer to the documentation for more information on Google Pay's availability.
      .mount("#googlepay-container");
  });
};

loadComponent();
