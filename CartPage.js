class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItem = '.cart_item';
        this.cartProductName = '.cart_item .inventory_item_name';
    }

    async navigateToCart() {
        await this.page.click('.shopping_cart_link');
        await this.page.waitForSelector(this.cartItem);
    }

    async verifyProductInCart(expectedProductName) {
        const actualProductName = await this.page.innerText(this.cartProductName);
        return actualProductName === expectedProductName;
    }

    async logout() {
        await this.page.click('#react-burger-menu-btn');
        await this.page.click('#logout_sidebar_link');
    }
}

module.exports = CartPage;
