getOriginKey().then((originKey) => {
  getPaymentMethods().then((paymentMethodsResponse) => {
    const checkout = new AdyenCheckout({
      originKey,
      environment: 'test',
      amount: { currency: 'EUR', value: 1000 },
      onAdditionalDetails: (result) => {
        console.log(result);
      },
      onError: (error) => {
        console.log(error);
      },
      onSubmit: (state, component) => {
        makePayment(state.data).then((response) => {
          component.unmount();
          checkout
            .createFromAction(response.action)
            .mount('#multibanco-container');
        });
      },
      paymentMethodsResponse,
    });

    checkout.create('multibanco').mount('#multibanco-container');
  });
});
