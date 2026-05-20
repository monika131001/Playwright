import {test as baseTest} from "@playwright/test";


exports.customtest = baseTest.extend(
    {
        testDataForOrder: {
            username: "moni13@gmail.com",
            password: "Mn@123456",
            productName: "ZARA COAT 4"
        }
    },
)