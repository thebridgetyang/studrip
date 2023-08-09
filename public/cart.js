/**
 * Name: Bridget Yang 
 * CS 132 Spring 2023
 * Date: June 3, 2023
 * 
 * Contains functions for the cart view page of the Studrip e-commerce store.
 */
(function() {
    "use strict";

    /**
     * Fetches all the items in the client's cart using our API
     * and then calls a helper function to display the items.
     */
    async function getCart() {
        try {
            let resp = await fetch("/cart");
            resp = checkStatus(resp);
            let data = await resp.json();
            await populateCart(data);
        } catch {
            handleError("Your cart could not be loaded.");
        }        
    }

    /**
     * Displays all the items in the cart from.
     * @param {Object} data - JSON object containing all the item names and 
     * quantities.
     */
    async function populateCart(data) {
        let cartDisplay = id("cart-content");
        let pageTitle = gen("h2");
        pageTitle.textContent = "Your Cart";
        cartDisplay.appendChild(pageTitle);
        let cart = data["cart"];
        if (cart.length === 0) {
            let empty = gen("p");
            empty.textContent = "Your cart is currently empty :(";
            cartDisplay.appendChild(empty)
        } else { // If cart is not empty
            for (let i = 0; i < cart.length; i++) {
                // Display item name, image, and quantity
                let img = await getImg(cart[i].name);
                let dispName = processName(cart[i].name);
                img.alt = dispName;
                let name = gen("h3");
                name.textContent = dispName;
                let quantity = gen("p");
                quantity.id = cart[i].name;
                quantity.textContent = "Quantity: " + cart[i].quantity;
                cartDisplay.appendChild(name);
                cartDisplay.appendChild(img);
                cartDisplay.appendChild(quantity);

                // Create + and - buttons to add and remove from cart
                let addBtn = genButton("+");
                addBtn.addEventListener("click", () => addToCart(cart[i].name));
                cartDisplay.appendChild(addBtn);
                let removeBtn = genButton("-");
                removeBtn.addEventListener("click", () => removeFromCart(cart[i]));
                cartDisplay.appendChild(removeBtn);
            }
        }
    }

    /**
     * When the client clicks the + button, adds another one more of the 
     * given product to the cart using the API and updates the cart.
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
            let curr = id(name).innerHTML;
            id(name).textContent = "Quantity: " + String(Number(curr.substring(10)) + 1);
        } catch {
            handleError("This item could not be added to your cart.");
        }
    }

    /**
     * When the client clicks the - button, removes one of the chosen 
     * products from the cart using the API and updates the cart.
     * @param {String} item - JSON object containing product name and quantity
     */
    async function removeFromCart(item) {
        let params = new FormData();
        params.append("name", item.name);
        params.append("quantity", item.quantity);
        try {
            let resp = await fetch("/remove", {
                method: "POST",
                body: params
            });
            resp = checkStatus(resp);
            let currQuantity = Number(id(item.name).innerHTML.substring(10));
            if (currQuantity - 1 > 0) {
                id(item.name).textContent = "Quantity: " + String(currQuantity - 1);
            } else {
                // If quantity of item drops to 0, must remove it from the page:
                await refreshCart();
            }
        } catch {
            handleError("This item could not be added to your cart.");
        }
    }

    /**
     * If the client removes an item from a cart, causing the quantity of the item
     * to go to 0, removes that item from the page.
     */
    async function refreshCart() {
        id("cart-content").innerHTML = "";
        await getCart();
    }

    /**
     * Helper function to generate submit input DOM object
     * @param {String} - "+" or "-" that will be displayed on button
     * @returns {Object} - DOM object that has the CSS selector
     * input[type="submit"]
     */
    function genButton(buttonSymbol) {
        let button = gen("input");
        button.type = "submit";
        button.value = buttonSymbol;
        button.classList.add("cart-btn");
        return button;
    }

    /**
     * Fetches the product image given its name.
     * @param {String} name - product name
     * @returns {Object} - DOM image object
     */
    async function getImg(name) {
        try {
            let resp = await fetch("/single/" + name);
            resp = checkStatus(resp);
            let data = await resp.json();
            let img = gen("img");
            img.src = data.url;;
            img.classList.add("cart-img");
            return img;
        } catch {
            handleError("The product image could not be loaded.");
        }
    }

    /**
     * Helper function to extract the item name.
     * @param {String} name - in lower case format, with each word being separated by "-"
     * @returns {String} - first letter capitalized and separated by space
     */
    function processName(name) {
        let dispName = name.split("-");
        for (let i = 0; i < dispName.length; i++) {
            dispName[i] = dispName[i].charAt(0).toUpperCase() + dispName[i].slice(1)
        }
        return dispName.join(' ');
    }

    /**
     * Displays an error message in lieu of the items in the cart.
     * @param {String} err - the error message
     */
    function handleError(err) {
        id("cart-content").textContent = err + " Please try again later!";
    }

    /**
     * Loads all the items that the client put in their cart.
     */
    function init() {
        getCart();
    }
    init();
})();