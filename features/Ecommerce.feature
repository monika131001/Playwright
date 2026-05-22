Feature: Ecommerce Validations

    Scenario: Placing the Order
        Given a login to Ecommerce application with "moni13@gmail.com" and "Mn@123456"
        When Add "Zara coat 3" to cart
        Then Verify "Zara coat 3" is displayed in the cart
        When Enter valid details and Place the Order
        Then Verify Order is present in the order history page
