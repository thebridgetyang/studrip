/**
 * Name: Bridget Yang 
 * CS 132 Spring 2023
 * Date: June 3, 2023
 * 
 * Contains functions for the single product view page of the Studrip 
 * e-commerce store.
 */
(function() {
    "use strict";

    /**
     * Fetches all the information about a single product using our
     * API and then calls a helper function to switch to the single
     * product view.
     */
    async function getProd() {
        let name = getProdName();
        try {
            let resp = await fetch("/single/" + name);
            resp = checkStatus(resp);
            let data = await resp.json();
            singleProduct(data);
        } catch {
            handleError("The product could not be loaded.");
        }
    }

    // Gets the specific product's name.
    function getProdName() {
        let params = new URLSearchParams(window.location.search);
        return params.get("name");
    }

    /**
     * Displays all the information (image, name, size, type, color, and 
     * price) of a single product extracted from products.json on the site.
     * @param {Object} data - JSON object containing all the product's information
     */
    function singleProduct(data) {
        let productDisplay = id("single-product-info");
        let img = gen("img");
        img.src = data.url;
        let name = processName(String(data.name));
        img.alt = name;
        let div = gen("div");
        let prodName = gen("h2");
        prodName.textContent = name;
        div.appendChild(prodName);
        let type = gen("p");
        type.textContent = "PRODUCT TYPE: " + data.type.toUpperCase();
        div.appendChild(type);
        let size = gen("p");
        size.textContent = "SIZE: " + data.size.toUpperCase();
        div.appendChild(size);
        let price = gen("p");
        price.textContent = "PRICE: $" + data.price + ".00";
        div.appendChild(price);
        let color = gen("p");
        color.textContent = "COLOR: " + data.color.toUpperCase();
        div.appendChild(color);
        let condition = gen("p");
        condition.textContent = "CONDITION: " + data.condition.toUpperCase();
        div.appendChild(condition);
        let button = gen("input");
        button.type = "submit";
        button.id = "add-cart-btn";
        button.value = "ADD TO CART +";
        button.addEventListener("click", () => addToCart(data.name));
        div.appendChild(button);
        productDisplay.appendChild(img);
        productDisplay.appendChild(div);
    }

    /**
     * Helper function to extract the item name.
     * @param {String} url - in lower case format, with each word being separated by "-"
     * @returns {String} - first letter capitalized and separated by space
    */
    function processName(url) {
        let name = url.split("-");
        for (let i = 0; i < name.length; i++) {
            name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1)
        }
        return name.join(' ');
    }

    /**
     * When the client clicks the 'ADD TO CART+' button, adds the given product
     * to the cart using the API.
     * @param {String} name - String containing product name
     */
    async function addToCart(name) {
        const item = new FormData();
        item.append("name", name);
        try {
            let resp = await fetch("/add", {
                method: "POST",
                body: item
            });
            resp = checkStatus(resp);
            let data = await resp.text();
            // TO DO
            console.log(data);
        } catch {
            handleError("This item could not be added to your cart.");
        }
    }

    /**
     * Displays an error message in lieu of the product.
     * @param {String} err - the error message
     */
    function handleError(err) {
        id("single-product-info").textContent = err + " Please try again later!";
    }

    /**
     * Calls the helper function to fetch and display the product information.
     */
    function init() {
        id("single-product-info").innerHTML = "";
        getProd();
    }
    init();
})();