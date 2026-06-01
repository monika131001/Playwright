class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    // Searches for a specific product by name and adds it to the cart
    async searchProductAddCart(productName) {
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            if ((await this.products.nth(i).locator("b").textContent()) === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                console.log("Product Added to cart!");
                break;
            }
        }
    }

    // Navigates user to Orders page
    async navigateToOrders() {
        await this.orders.click();
    }

    // Navigates user to Cart page
    async navigateToCart() {
        await this.cart.click();
    }

}
module.exports = { DashboardPage };