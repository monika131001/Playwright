class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login", // Send POST request to login API with user credentials
      { data: this.loginPayload },
    );
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    const response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-type": "application/json",
        },
      },
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    const orderId = orderResponseJSON.orders[0];
    response.orderId = orderId;
    return response;
  }
}

module.exports = { ApiUtils };
