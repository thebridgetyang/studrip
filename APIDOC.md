# CS132 Clothing API Documentation
**Authors:** Angel Wang, Bridget Yang
**Last Updated:** 06/04/2023

The Clothing API allows a user to retrieve clothing products with their information for a clothing e-commerce website.
It also allows a user to add/remove items from a cart, and retrieve questions and answers for customers.

Summary of endpoints:
* GET /products
* GET /single/:name
* GET /faq
* GET /cart
* GET /promotions
* POST /add
* POST /remove
* POST /contact

Note that all errors will be in plain text format, while most (if not all) of the GET endpoints return JSON objects!

Contact the authors at awang7@caltech.edu and bcyang@caltech.edu for any bug reports or feature requests!

## GET /products
**Request Type**: GET

**Returned Data Format:** JSON

**Description:** Returns JSON data for all products

**Supported Parameters:** 
* type (optional)
    * can be either "top" or "bottom"
* condition (optional)
    * can be either "good" or "excellent"
* size (optional)
    * can be "small", "medium", or "large"

**Example Request:** curl --location 'localhost:8000/public/products'
        
**Example Response:**

``` json
{
    "products": [
        {
            "name": "asymmetrical-top",
            "type": "top",
            "url": "imgs/asymmetrical-top.jpg",
            "price": "10",
            "color": "green",
            "size": "large",
            "percent-off": 100
        },
        {
            "name": "black-bodysuit",
            "type": "top",
            "url": "imgs/black-bodysuit.jpg",
            "price": "10",
            "color": "black",
            "size": "small",
            "percent-off": 100
        },
        {
            "name": "linen-blend-cargo-pants",
            "type": "bottom",
            "url": "imgs/linen-blend-cargo-pants.jpg",
            "price": "25",
            "color": "black",
            "size": "small",
            "percent-off": 100
        },
        {
            "name": "linen-blend-wide-leg-pants",
            "type": "bottom",
            "url": "imgs/linen-blend-wide-leg-pants.jpg",
            "price": "20",
            "color": "white",
            "size": "small",
            "percent-off": 100
        },
        {
            "name": "beige-tank-top",
            "type": "top",
            "url": "imgs/beige-tank-top.jpg",
            "price": "10",
            "color": "beige",
            "size": "large",
            "percent-off": 100
        },
        {
            "name": "linen-palazzo-pants",
            "type": "bottom",
            "url": "imgs/linen-palazzo-pants.jpg",
            "price": "15",
            "color": "black",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "black-tank-top",
            "type": "top",
            "url": "imgs/black-tank-top.jpg",
            "price": "15",
            "color": "black",
            "size": "medium",
            "percent-off": 100
        },
        {
            "name": "nylon-blend-parachute-pants",
            "type": "bottom",
            "url": "imgs/nylon-blend-parachute-pants.jpg",
            "price": "30",
            "color": "pink",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "satin-effect-cargo-pants",
            "type": "bottom",
            "url": "imgs/satin-effect-cargo-pants.jpg",
            "price": "25",
            "color": "black",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "cut-out-knit-top",
            "type": "top",
            "url": "imgs/cut-out-knit-top.jpg",
            "price": "10",
            "color": "white",
            "size": "medium",
            "percent-off": 100           
        },
        {
            "name": "cut-out-top",
            "type": "top",
            "url": "imgs/cut-out-top.jpg",
            "price": "15",
            "color": "white",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "knotted-top",
            "type": "top",
            "url": "imgs/knotted-top.jpg",
            "price": "15",
            "color": "white",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "open-back-top",
            "type": "top",
            "url": "imgs/open-back-top.jpg",
            "price": "20",
            "color": "white",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "rib-bandeau-top",
            "type": "top",
            "url": "imgs/rib-bandeau-top.jpg",
            "price": "10",
            "color": "black",
            "size": "large",
            "percent-off": 100
        },
        {
            "name": "ruffle-tank-top",
            "type": "top",
            "url": "imgs/ruffle-tank-top.jpg",
            "price": "10",
            "color": "grey",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "ruffled-knit-top",
            "type": "top",
            "url": "imgs/ruffled-knit-top.jpg",
            "price": "15",
            "color": "white",
            "size": "medium",
            "percent-off": 100           
        },
        {
            "name": "seamless-cut-out-top",
            "type": "top",
            "url": "imgs/seamless-cut-out-top.jpg",
            "price": "20",
            "color": "black",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "square-neck-crop-top",
            "type": "top",
            "url": "imgs/square-neck-crop-top.jpg",
            "price": "10",
            "color": "pink",
            "size": "small",
            "percent-off": 100           
        },
        {
            "name": "white-tank-top",
            "type": "top",
            "url": "imgs/white-tank-top.jpg",
            "price": "15",
            "color": "white",
            "size": "large",
            "percent-off": 100           
        }
    ]
}

```

**Error Handling:**
A 500 error will be thrown if there is an error when loading the products.json file.
Example: products.json does not exist

## GET /single/:name
**Request Type**: GET

**Returned Data Format:** JSON

**Description:** Returns JSON object for a single product's information

**Supported Parameters**
* /:name (required)
  * Will return the single product's information based on the name

**Example Request:** curl --location 'localhost:8000/public/single/asymmetrical-top'

**Example Response:**

``` json
    {
        "name": "asymmetrical-top",
        "type": "top",
        "url": "imgs/asymmetrical-top.jpg",
        "price": "10",
        "color": "green",
        "size": "large",
        "percent-off": 100
    }
```

**Error Handling:**
A 500 error will be thrown if there is an error when loading the products.json file.
Example: products.json does not exist

A 400 error will occur if the requested product name does not exist in the database.
Example: if there is a typo in the name ("asymmetricaltop"),
or if the product name is simply not in the database.

A 400 error will occur if no name is requested.
Example: The url is given as only "single"

## GET /faq
**Request Type**: GET

**Returned Data Format:** JSON

**Description:** Returns JSON object for the clothing website's most commonly-asked questions with their answers.

**Supported Parameters** None

**Example Request:** curl --location 'localhost:8000/public/faq'

**Example Response:**

``` json
    {
        "questions": [
            {
                "question": "When should my order arrive?",
                "answer": "You should expect your order to ship within 3-5 business days."
            },
            {
                "question": "What is the return policy?",
                "answer": "You can return your products within 30 days of the delivery date."
            },
            {
                "question": "Are your items high quality?",
                "answer": "Yes, our products are made of the finest materials that will last you a lifetime."
            },
            {
                "question": "Are your clothes sustainable?",
                "answer": "Yes, we use recycled materials in all of our products."
            },
            {
                "question": "Are there plus sizes available?",
                "answer": "We are currently working on a plus collection. Stay tuned!"
            },
            {
                "question": "Are your products short-girl friendly?",
                "answer": "No. Grow taller."
            }
        ]
    }
```

**Error Handling:**
A 500 error will be thrown if there is an error when loading the products.json file.
Example: products.json does not exist

## GET /cart
**Request Type**: GET

**Returned Data Format:** JSON

**Description:** Returns JSON object for all products in the cart, where keys are product names and values are 
their quantities in the cart

**Supported Parameters** none

**Example Request:** curl --location 'localhost:8000/public/cart'

**Example Response:**

``` json
    {
        "asymmetrical-top" : 1
    }
```

## GET /promotions
**Request Type**: GET

**Returned Data Format:** JSON

**Description:** Returns JSON object for all the promotions in the store.

**Supported Parameters** none

**Example Request:** curl --location 'localhost:8000/public/promotions'

**Example Response:**

``` json
{
    "promotions": [
        {
            "time": "6/18/2023",
            "discount": "Treat yourself on your father's coin! Every father wants to spoil their children. Take 30% off everything!"
        },
        {
            "time": "6/19/2023",
            "discount": "Take 21 percent off all tops for one of our CEO's (Angel Wang) birthday!"
        },
        {
            "time": "7/4/2023",
            "discount": "Buy one item and get 3 free for FOURTH of July!"
        },
        {
            "time": "9/4/2023",
            "discount": "For Labor Day, take a break and buy one get one free!"
        },
        {
            "time": "9/19/2023",
            "discount": "Take 21 percent off all bottoms for one of our CEO's (Bridget Yang) birthday!"
        }
    ]
}
```

**Error Handling:**
A 500 error will be thrown if there is an error when loading the promotions.json file.
Example: promotions.json does not exist

## POST /add
**Request Type**: POST

**Returned Data Format:** text/plain

**Description:** Adds an item to the cart.json file along with the quantity.
Returns a success message if successful, or an error message if something goes wrong.

**Supported Parameters**
* name (required)
  * Posts the item with the given name to the cart

**Example Request:** /add
* POST body parameters: 
  * name = asymmetrical-top

**Example Response:**

``` Successfully added to cart! ```

**Error Handling:**
A 500 error will be thrown if the item could not be added to cart.json
Example: there was an error writing to the cart.json file

A 400 error will occur if the required name parameter is missing.

## POST /remove
**Request Type**: POST

**Returned Data Format:** text/plain

**Description:** Decrements an item's quantity in the cart.json file. If the quantity is 0, it removes the item.
Returns a success message if successful, or an error message if something goes wrong.

**Supported Parameters**
* name (required)
  * Posts the updated quantity of item with the given name to the cart

**Example Request:** /remove
* POST body parameters: 
  * name = asymmetrical-top

**Example Response:**

``` Successfully removed from cart! ```

**Error Handling:**
A 500 error will be thrown if the item could not be removed from cart.json
Example: there was an error writing to the cart.json file

A 400 error will occur if the required name parameter is missing.

## POST /contact
**Request Type**: POST

**Returned Data Format:** text/plain

**Description:** Adds the contact information (email) of a client and a question they have to the contact.json file.

**Supported Parameters**
* email (required)
    * client's email address (ie: bcyang@caltech.edu) so that they can be contacted
* question (required)
    * question they want to ask the owners

**Example Request:** /contact
* POST body parameters
    * email=bcyang@caltech.edu
    * question= When will the asymmetrical top be restocked in size small?

**Example Response:**
{
    "contacts" : [
        {
            email = "bcyang@caltech.edu",
            question = "When will the asymmetrical top be restocked in size small?"
        }
    ]
}

``` The question was received successfully! ```

**Error Handling:**
A 500 error will be thrown if the question could not be added to contact.json
Example: there was an error writing to the contact.json file

A 400 error will be thrown if there is no email or question inputted when the form is submitted.