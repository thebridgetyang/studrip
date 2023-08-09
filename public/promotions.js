/**
 * Name: Bridget Yang 
 * CS 132 Spring 2023
 * Date: June 3, 2023
 * 
 * Contains functions for the promotions page of the Studrip e-commerce store.
 */
(function() {
    "use strict";

    /**
     * Fetches all the promotions and then calls the helper function to
     * display them on the page.
     */
    async function getPromotions() {
        try {
            let resp = await fetch("/promotions");
            resp = checkStatus(resp);
            let data = await resp.json();
            displayPromotions(data);
        } catch {
            handleError("The promotions could not be loaded.");
        }
    }

    /**
     * Displays all the promotions extracted from promotions.json on the site.
     * @param {Object} data - JSON object containing all the promotions
     */
    function displayPromotions(data) {
        let promotions = data.promotions;
        let disp = id("promotions");
        disp.innerHTML = "";
        let pageTitle = gen("h2");
        pageTitle.textContent = "Upcoming Promotions";
        disp.appendChild(pageTitle);
        for (let i = 0; i < promotions.length; i++) {
            let div = gen("div");
            let when = gen("h3");
            when.textContent = promotions[i].time;
            let promo = gen("p");
            promo.textContent = promotions[i].discount;
            div.appendChild(when);
            div.appendChild(promo);
            disp.appendChild(div);
        }
    }

    /**
     * Displays an error message in lieu of the promotions.
     * @param {String} err - the error message
     */
    function handleError(err) {
        id("promotions").textContent = err + " Please try again later!";
    }

    /**
     * Calls the helper function to fetch all the promotions.
     */
    function init() {
        getPromotions();
    }
    init();
})();