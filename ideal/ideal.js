getPaymentMethods().then((response) => {
  const checkout = new AdyenCheckout({
    paymentMethodsResponse: response,

    showPayButton: true,

    onSubmit: (state, component) => {
      makePayment(state.data);
    },
    onChange: (state, component) => {
      updateStateContainer(state);
    },
  });

  const ideal = checkout.create('ideal').mount('#ideal-container');
});
