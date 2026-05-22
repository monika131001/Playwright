const base = require("@playwright/test");

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "moni13@gmail.com",
            password: "Mn@123456",
            productName: "ZARA COAT 3"
        }
    },
)