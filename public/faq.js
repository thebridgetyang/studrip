/**
 * Name: Bridget Yang 
 * CS 132 Spring 2023
 * Date: June 3, 2023
 * 
 * Contains functions for the FAQ page of the Studrip e-commerce store.
 */
(function() {
    "use strict";

    /**
     * Fetches all the frequently asked questions and then calls the helper
     * function to display them on the page.
     */
    async function getQuestions() {
        try {
            let resp = await fetch("/faq");
            resp = checkStatus(resp);
            let data = await resp.json();
            displayQuestions(data);
        } catch {
            handleError("The promotions could not be loaded.");
        }
    }

    /**
     * Displays all the frequently asked questions extracted from questions.json 
     * on the site.
     * @param {Object} data - JSON object containing all the frequently asked 
     * questions
     */
    function displayQuestions(data) {
        let questions = data.questions;
        let disp = id("faq");
        disp.innerHTML = "";
        let pageTitle = gen("h2");
        pageTitle.textContent = "Frequently Asked Questions";
        disp.appendChild(pageTitle);
        for (let i = 0; i < questions.length; i++) {
            let div = gen("div");
            let q = gen("h3");
            q.textContent = questions[i].question;
            let answer = gen("p");
            answer.textContent = questions[i].answer;
            div.appendChild(q);
            div.appendChild(answer);
            disp.appendChild(div);
        }
    }

    /**
     * Displays an error message in lieu of the questions.
     * @param {String} err - the error message
     */
    function handleError(err) {
        id("faq").textContent = err + " Please try again later!";
    }

    /**
     * Calls the helper function to fetch all the frequently asked
     * questions.
     */
    function init() {
        getQuestions();
    }
    init();
})();