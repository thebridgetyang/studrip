/**
 * Name: Bridget Yang 
 * CS 132 Spring 2023
 * Date: June 3, 2023
 * 
 * Contains functions for the main home page of the Studrip e-commerce store.
 * Displays all the products and allows the client to filter the products.
 */
(function() {
    "use strict";
    // Single product view URL
    const SINGLE_URL = "single.html"

    /**
     * Fetches all the product information using our API and
     * then calls a helper function to display all the information
     * on the site.
     */
    async function getProducts() {
        let filter = id("filter-dropdown-menu").value;
        if (filter === "top" || filter === "bottom") {
            filter = "?type=" + filter;
        } else if (filter === "condition: good" || filter === "condition: excellent") {
            filter = "?condition=" + filter.substring(11);
        } else if (filter === "small" || filter === "medium" || filter === "large") {
            filter = "?size=" + filter;
        }
        try {
            let resp = await fetch("/products" + filter);
            resp = checkStatus(resp);
            let data = await resp.json();
            populateProducts(data);
        } catch {
            handleError("The products could not be loaded.");
        }
    }

    /**
     * Displays all the products (image, name, size, and price) from 
     * products.json on the site.
     * @param {Object} data - JSON object containing all the products' information
     */
    function populateProducts(data) {
        let productsDisplay = id("products");
        productsDisplay.innerHTML = "";
        for (let i = 0; i < data.products.length; i++) {
            let product = data.products[i];
            let link = gen("a");
            link.href = SINGLE_URL + "?name=" + product.name;
            link.classList.add("product");
            let prodImg = gen("img");
            prodImg.classList.add("product-img");
            prodImg.src = product.url;
            prodImg.alt = processName(String(product.name));
            let prodDesc = gen("div");
            prodDesc.classList.add("product-desc");
            let name = gen("p");
            name.textContent = processName(String(product.name)) + " (" + (String(product.size)[0]).toUpperCase() + ")";
            prodDesc.appendChild(name);
            let price = gen("p");
            price.textContent = "$" + String(product.price);
            prodDesc.appendChild(price);
            link.appendChild(prodImg);
            link.appendChild(prodDesc);
            productsDisplay.appendChild(link);
        }
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
     * Displays an error message in lieu of the products.
     * @param {String} err - the error message
     */
    function handleError(err) {
        id("products").innerHTML = "";
        id("products").textContent = err + " Please try again later!";
    }

    /**
     * Gets all the products and adds an event listener so that if the 
     * client applies a filter, the site updates and displays only the
     * products that meet the filter requirements.
     */
    function init() {
        getProducts();
        id("filter-dropdown-menu").addEventListener("change", getProducts);
    }
    init();
})();