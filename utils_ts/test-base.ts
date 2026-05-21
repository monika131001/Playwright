import { test as baseTest } from "@playwright/test";
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>
    ({
        testDataForOrder: {
            username: "moni13@gmail.com",
            password: "Mn@123456",
            productName: "ZARA COAT 4"
        }
    },
    )