/**
 * Name: Bridget Yang 
 * CS 132 Spring 2023
 * Date: June 3, 2023
 * 
 * Contains functions for the contact page of the Studrip e-commerce store.
 */
(function() {
    "use strict";

    /**
     * Submits email address and question to the API as a POST request.
     * Throws an error if not all fields are filled out properly.
     */
    async function submitContact() {
        try {
            const params = new FormData();
            params.append("email", qs("input[name='email']").value);
            params.append("question", qs("textarea[name='question']").value);
            let resp = await fetch("/contact", { method : "POST", body : params });
            resp = checkStatus(resp);
            let data = await resp.text();
            submittedMsg(data);
        } catch {
            handleError("Your question could not be submitted at this time.");
        }
    }

    /**
     * Displays a message below the form to indicate that the client's
     * contact information and question were correctly submitted.
     * @param {Text} data - plain text containing the submitted message
     */
    function submittedMsg(data) {
        let msgDisplay = id("submitted-message");
        let message = gen("p");
        message.textContent = data;
        msgDisplay.appendChild(message);
    }

    /**
     * Displays an error message in lieu of the submitted message.
     * @param {String} err - the error message
     */
    function handleError(err) {
        id("submitted-message").textContent = err + " Please try again later!";
    }

    /**
     * Gets rid of any previous messages from the server to the client indicating
     * that their question was correctly submitted and allows the form to be
     * submitted if the client correctly filled out all the fields.
     */
    function init() {
        id("submitted-message").innerHTML = "";
        // Inspired by Lecture 14 code to prevent default form submit behavior:
        id("contact-form").addEventListener("submit", function(event) {
            // if we've gotten in here, all HTML5 validation checks have passed
            event.preventDefault();
            submitContact();
        });
    }
    init();
})();