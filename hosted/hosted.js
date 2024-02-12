const getConfig = async (localeConfig) => {
  const config = {
    ...localeConfig
  };

  config.showRemovePaymentMethodButton = document.querySelector('#showRemovePaymentMethodButton').checked;

  config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');

  return config;
};

const createHostedCheckout = function createHostedCheckout() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig(localeConfig).then((config) => {
      getSessions(config, true).then((sessionsResponse) => {
        const hostedContainer = document.querySelector('#hosted-container');
        hostedContainer.innerHTML = `<a href="${sessionsResponse.url}" target="_blank">${sessionsResponse.url}</a>`;
      });
    });
  });
};

createHostedCheckout();

const reload = function reload() {
  clearRequests();
  createHostedCheckout();
};
