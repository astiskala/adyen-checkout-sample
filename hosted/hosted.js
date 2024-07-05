const getConfig = async (localeConfig) => {
  const config = {
    ...localeConfig
  };

  config.showRemovePaymentMethodButton = document.querySelector('#showRemovePaymentMethodButton').checked;

  config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');

  return config;
};

let redirectUrl;

const createHostedCheckout = function createHostedCheckout() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig(localeConfig).then((config) => {
      getSessions(config, true).then((sessionsResponse) => {
        redirectUrl = sessionsResponse.url;
        const hostedContainer = document.querySelector('#hosted-container');
        hostedContainer.innerHTML = `<a href="${redirectUrl}" target="_blank">${redirectUrl}</a>`;
      });
    });
  });
};

createHostedCheckout();

const reload = function reload() {
  clearRequests();
  createHostedCheckout();
  window.location.href = redirectUrl;
};
