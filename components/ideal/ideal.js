const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let ideal;

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

            showPayButton: true,

            onSubmit: (state, component) => {
              makePayment(state.data);
            },
            onChange: (state, component) => {
              updateStateContainer(state);
            },
          });

          ideal = checkout.create('ideal').mount('#ideal-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (ideal !== undefined) {
    ideal.unmount('#ideal-container');
  }

  clearRequests();
  loadComponent();
};
