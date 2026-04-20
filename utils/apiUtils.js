class apiUtils {

    constructor(apiContext) {
        
    }
  async getToken() {
    const loginResponse = await apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login", // Send POST request to login API with user credentials
      { data: loginPayload },
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    token = loginResponseJSON.token;
    console.log(token);
    return token;
  }
}
