Feature: Ecommerce Validations

    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username         | password  |
            | moni13@gmail.com | Mn@123456 |
            | hello1@gmail.com | Hello@123 |