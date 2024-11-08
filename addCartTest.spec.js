const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    try {
        console.log('Launching the browser...');
        const browser = await chromium.launch({ headless: false }); // Launch browser
        const page = await browser.newPage();

        console.log('Navigating to SauceDemo...');
        await page.goto('https://www.saucedemo.com/');

        // Step 2: Login to the site
        console.log('Logging in...');
        await page.fill('#user-name', 'standard_user'); // Username
        await page.fill('#password', 'secret_sauce');  // Password
        await page.click('#login-button');  // Click login button

        // Step 3: Verify successful login by checking the Products page
        console.log('Verifying Products page...');
        await page.waitForSelector('.inventory_list'); // Wait for the products list to appear

        // Step 4: Get the first product's name and price
        console.log('Fetching the first product details...');
        const productName = await page.innerText('.inventory_item:first-of-type .inventory_item_name');
        const productPrice = await page.innerText('.inventory_item:first-of-type .inventory_item_price');
        console.log(`First product: ${productName}, Price: ${productPrice}`);

        // Step 5: Add the product to the cart
        console.log('Adding the product to the cart...');
        await page.click('.inventory_item:first-of-type .btn_inventory');

        // Step 6: Navigate to cart and verify product is added
        console.log('Navigating to the cart...');
        await page.click('.shopping_cart_link');
        await page.waitForSelector('.cart_item'); // Wait for the cart item to appear

        const cartProductName = await page.innerText('.cart_item .inventory_item_name');
        if (cartProductName === productName) {
            console.log('Product successfully added to the cart!');
        } else {
            console.error('Error: Product was not added to the cart.');
        }

        // Step 7: Logout
        console.log('Logging out...');
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');

        // Write product details to a file
        fs.writeFileSync('productDetails.txt', `Product: ${productName}, Price: ${productPrice}`);

        console.log('Test completed successfully!');
        await browser.close();  // Close the browser
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
