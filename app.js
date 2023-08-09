/**
 * Name(s): Angel Wang, Bridget Yang
 * CS 132 Spring 2023
 * Date: June 1, 2023
 * 
 * This is the API for our fashion e-commerce store. It contains various
 * GET and POST endpoints that aid in the functionality of the store.
 */

"use strict";

const express = require("express");
const app = express();
const fs = require("fs/promises");
const multer = require("multer");
const CLIENT_ERR_CODE = 400;
const SERVER_ERR_CODE = 500;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());
app.use(express.static("public"));

// GET endpoints
/** 
 * Gets all the clothing items as a JSON object and applies any filters if there are any.
 * Returns a 500 error if products cannot be loaded
*/
app.get("/products", async function (req, res) {
    let contents = await loadFile("products.json");
    let type = req.query["type"];
    let condition = req.query["condition"];
    let size = req.query["size"];
    if (type || condition || size) {
        let products = contents["products"];
        if (type) {
            contents["products"] = filter(products, "type", type);
        } else if (condition) {
            contents["products"] = filter(products, "condition", condition)
        } else {
            contents["products"] = filter(products, "size", size);           
        }
    }
    res.json(contents);
});

/**
 * Gets the information for a single item based on the name.
 * Returns a 400 error if the name does not match any product or if the name is not included
 * in the fetch link.
 * Returns a 500 error if products from products.json cannot be loaded
 */
app.get("/single/:name", async function (req, res, next) {
    let itemName = req.params.name;

    if (itemName) {
        let contents = await loadFile("products.json");
        let products = contents["products"];
        let found = false;
        for (let i = 0; i < products.length; i++) {
            let item = products[i];
            if (item["name"] === itemName) {
                res.json(item);
                found = true;
            }
        }

        if (!found) {
            res.status(CLIENT_ERR_CODE);
            next(Error("The product could not be found."));
        }
    }
    else {
        res.status(CLIENT_ERR_CODE);
        next(Error("The name parameter must be included in the fetch link"));
    }
});

/** 
 * Gets all the frequently asked questions and their answers
 * Returns a 500 error if questions cannot be loaded.
*/
app.get("/faq", async function (req, res) {
    let questions = await loadFile("questions.json");
    res.json(questions);
});

/**
 * Gets all the promotion items as a JSON object.
 * Returns a 500 error if the promotion items cannot be loaded.
 */
app.get("/promotions", async function(req, res) {
    let promotions = await loadFile("promotions.json");
    res.json(promotions);
});

/**
 * Gets the products in the cart. 
 * Returns a 500 error if the cart cannot be loaded.
*/
app.get("/cart", async function (req, res) {
    let contents = await loadFile("cart.json");
    res.json(contents);
});

// POST endpoints
/**
 * Adds an item to the cart.json file.
 * Required POST parameters: name
 * Response type: text/plain
 * Sends a 400 error if missing one of the required params.
 * Sends a 500 error if something goes wrong in file-processing.
 * Sends a success message if nothing goes wrong and the product is successfully added.
 */
app.post("/add", async function (req, res, next) {
    let name = req.body["name"];

    if (!name) {
        res.status(CLIENT_ERR_CODE);
        next(Error("Must have the name of the item to add to cart"));
    }

    try {
        let cartContent = await loadFile("cart.json");
        let cart = cartContent["cart"];
        let added = false;
        for (let item of cart) {
            if (item["name"] === name) {
                item["quantity"] += 1;
                added = true;
            }
        }

        if (!added) {
            cart.push({
                "name": name,
                "quantity": 1
            })
        }

        await fs.writeFile("data/cart.json", JSON.stringify(cartContent, null, 2), "utf8");
        res.type("text");
        res.send("Successfully added to cart!");
    }
    catch {
        res.status(SERVER_ERR_CODE);
        next(Error("Failed to add item to cart"));
    }
});

/**
 * Removes an item from the cart.json file.
 * Required POST parameters: name
 * Response type: text/plain
 * Sends a 400 error if missing one of the required params.
 * Sends a 500 error if something goes wrong in file-processing.
 * Sends a success message if nothing goes wrong and the product is successfully removed.
 */
app.post("/remove", async function (req, res, next) {
    let name = req.body["name"];

    if (!name) {
        res.status(CLIENT_ERR_CODE);
        next(Error("Must have the name of the item to add to cart"));
    }

    try {
        let cartContent = await loadFile("cart.json");
        let cart = cartContent["cart"];
        let found = false;

        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            if (item["name"] === name) {
                if (item["quantity"] === 1) {
                    cart = cart.slice(0, i).concat(cart.slice(i + 1));
                }
                else {
                    item["quantity"] -= 1;
                }
                found = true;
            }
        }

        cartContent["cart"] = cart;

        if (!found) {
            res.status(CLIENT_ERR_CODE);
            next(Error("Item was not found in the cart; could not remove"));
        }

        await fs.writeFile("data/cart.json", JSON.stringify(cartContent, null, 2), "utf8");
        res.type("text");
        res.send("Successfully removed from cart!");
    }
    catch {
        res.status(SERVER_ERR_CODE);
        next(Error("Failed to remove item from cart"));
    }
});

/**
 * Adds a question associated with a customer email to the contact.json file
 * Required POST parameters: email, question
 * Response type: text/plain
 * Sends a 400 error if missing one of the required params.
 * Sends a 500 error if something goes wrong in file-processing.
 * Sends a success message if nothing goes wrong and the email/question was added successfully.
 */
app.post("/contact", async function (req, res, next) {
    const email = req.body["email"];
    const question = req.body["question"];

    if (!email || !question) {
        res.status(CLIENT_ERR_CODE);
        next(Error("Must have the customer email and question"));
    }

    try {
        let contactContent = await loadFile("contact.json");
        let contacts = contactContent["contacts"];
        let newContact = {"email": email, "question": question};
        contacts.push(newContact);

        await fs.writeFile("data/contact.json", JSON.stringify(contactContent, null, 2), "utf8");
        res.type("text");
        res.send("Successfully added the question and email!");
    }
    catch {
        res.status(SERVER_ERR_CODE);
        next(Error("Failed to add question and email :("));
    }
});

// HELPER FUNCTIONS

/**
  * Helper function to load the data from a given json file.
  * @param {String} fileName - the name of the json file to load data from
  * @returns {object} JSON object with contents if success, or specific error message (text/plain) if fail
*/
async function loadFile(fileName) {
    try {
        let contents = await fs.readFile("data/" + fileName);
        return JSON.parse(contents);
    }
    catch (err) {
        res.status(SERVER_ERR_CODE);
        err.message = fileName + " file not found";
        next(err);
    }
}

/**
 * Helper function that applies either a type, condition, or size filter.
 * @param {Object} products - JSON object containing all the products and their 
 * information
 * @param {String} filterType - type of filter being applied
 * @param {String} filterVal - the filter value (ie: "top")
 * @returns {Array} - items that meet the filter requirements
 */
function filter(products, filterType, filterVal) {
    let filtered = [];
    for (let i = 0; i < products.length; i++) {
        let item = products[i];
        if (item[filterType] === filterVal) {
            filtered.push(item);
        }
    }
    return filtered
}

// This function takes inspiration from the Cafe API
/**
  * Error-handling middleware in case something goes wrong at an endpoint.
  * Sends the error message as plain text.
  * @param {error} err - error with specific error message
  * @param {Object} req - request object that contains information about the HTTP request
  * @param {Object} res - response object that contains information about the HTTP response
  * @param {} next - next middleware function
*/
function errorHandler(err, req, res, next) {
    res.type("text");
    res.send(err.message);
}

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});