let queryStringToObject = (queryString) => {
  let obj = {};
  if (queryString) {
    queryString.split("&").map((item) => {
      const [k, v] = item.split("=");
      v ? (obj[k] = v) : null;
    });
  }
  return obj;
};

let handlePostback = function handlePostback(paymentData, postData) {
  updateResponseContainer("Postback", postData);

  let details = queryStringToObject(postData);
  let paymentDetails = { paymentData: paymentData, details: details };

  submitAdditionalDetails(paymentDetails).then((result) => {
    if (result.resultCode) {
      updateResultContainer(result.resultCode);
    } else if (result.message) {
      updateResultContainer(result.message);
    }
  });
};
