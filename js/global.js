/* =========================================================
   ISLAMIC LIGHT
   Family & Married Life Website
   Global JavaScript
   File: global.js
   ========================================================= */

"use strict";


/* =========================================================
   1. GLOBAL CONFIGURATION
   ========================================================= */

const SITE_CONFIG = {
    headerPath: "/includes/header.html",
    footerPath: "/includes/footer.html"
};


/* =========================================================
   2. LOAD HTML INCLUDE
   ========================================================= */

async function loadInclude(selector, filePath) {

    const container = document.querySelector(selector);

    if (!container) {
        return;
    }

    try {

        const response = await fetch(filePath, {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                `Failed to load ${filePath}: ${response.status}`
            );
        }

        const html = await response.text();

        container.innerHTML = html;

    } catch (error) {

        console.error(
            `Islamic Light: Unable to load ${filePath}`,
            error
        );

    }
}


/* =========================================================
   3. LOAD HEADER
   ========================================================= */

async function loadHeader() {

    await loadInclude(
        "#site-header",
        SITE_CONFIG.headerPath
    );

    initializeHeader();

}


/* =========================================================
   4. LOAD FOOTER
   ========================================================= */

async function loadFooter() {

    await loadInclude(
        "#site-footer",
        SITE_CONFIG.footerPath
    );

    initializeFooter();

}


/* =========================================================
   5. INITIALIZE HEADER
   ========================================================= */

function initializeHeader() {

    initializeMobileMenu();

    initializeSearch();

    initializeActiveNavigation();

    initializeDropdowns();

}


/* =========================================================
   6. MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuToggle =
        document.getElementById("menu-toggle");

    const navigation =
        document.querySelector(".main-navigation");

    if (!menuToggle || !navigation) {
        return;
    }


    menuToggle.addEventListener("click", function () {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "মেনু খুলুন" : "মেনু বন্ধ করুন"
        );

        navigation.classList.toggle(
            "is-open",
            !isOpen
        );

    });


    /*
     * Close menu after clicking a navigation link
     * on mobile devices.
     */

    const navigationLinks =
        navigation.querySelectorAll(".nav-link");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {

                closeMobileMenu();

            }

        });

    });

}


/* =========================================================
   7. CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const menuToggle =
        document.getElementById("menu-toggle");

    const navigation =
        document.querySelector(".main-navigation");

    if (!menuToggle || !navigation) {
        return;
    }

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "মেনু খুলুন"
    );

    navigation.classList.remove("is-open");

}


/* =========================================================
   8. SEARCH
   ========================================================= */

function initializeSearch() {

    const searchToggle =
        document.getElementById("search-toggle");

    const searchPanel =
        document.getElementById("search-panel");

    const searchInput =
        document.getElementById("site-search");

    if (!searchToggle || !searchPanel) {
        return;
    }


    searchToggle.addEventListener("click", function () {

        const isOpen =
            searchToggle.getAttribute("aria-expanded") === "true";


        searchToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );


        searchPanel.classList.toggle(
            "is-open",
            !isOpen
        );


        searchPanel.setAttribute(
            "aria-hidden",
            String(isOpen)
        );


        if (!isOpen && searchInput) {

            setTimeout(function () {

                searchInput.focus();

            }, 100);

        }

    });

}


/* =========================================================
   9. CLOSE SEARCH
   ========================================================= */

function closeSearch() {

    const searchToggle =
        document.getElementById("search-toggle");

    const searchPanel =
        document.getElementById("search-panel");

    if (!searchToggle || !searchPanel) {
        return;
    }

    searchToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    searchPanel.classList.remove("is-open");

    searchPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   10. ACTIVE NAVIGATION
   ========================================================= */

function initializeActiveNavigation() {

    const navigation =
        document.querySelector(".main-navigation");

    if (!navigation) {
        return;
    }


    const currentPath =
        normalizePath(window.location.pathname);


    const navigationLinks =
        navigation.querySelectorAll(".nav-link");


    navigationLinks.forEach(function (link) {

        const linkURL =
            new URL(link.href, window.location.origin);

        const linkPath =
            normalizePath(linkURL.pathname);


        if (linkPath === currentPath) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


/* =========================================================
   11. NORMALIZE URL PATH
   ========================================================= */

function normalizePath(path) {

    if (!path) {
        return "/";
    }


    /*
     * Remove trailing slash
     * except for homepage.
     */

    if (path.length > 1 && path.endsWith("/")) {

        path = path.slice(0, -1);

    }


    return path.toLowerCase();

}


/* =========================================================
   12. DROPDOWN SUPPORT
   ========================================================= */

function initializeDropdowns() {

    const dropdownItems =
        document.querySelectorAll(".has-dropdown");


    if (!dropdownItems.length) {
        return;
    }


    dropdownItems.forEach(function (item) {

        const trigger =
            item.querySelector(".dropdown-toggle");


        if (!trigger) {
            return;
        }


        trigger.addEventListener(
            "click",
            function (event) {

                if (window.innerWidth <= 768) {

                    event.preventDefault();

                    const isOpen =
                        item.classList.contains("is-open");


                    /*
                     * Close other dropdowns.
                     */

                    dropdownItems.forEach(
                        function (otherItem) {

                            otherItem.classList.remove(
                                "is-open"
                            );

                        }
                    );


                    item.classList.toggle(
                        "is-open",
                        !isOpen
                    );

                }

            }
        );

    });

}


/* =========================================================
   13. CLOSE MENUS WITH ESC KEY
   ========================================================= */

function initializeKeyboardControls() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeMobileMenu();

            closeSearch();


            /*
             * Close dropdowns.
             */

            document
                .querySelectorAll(".has-dropdown.is-open")
                .forEach(function (item) {

                    item.classList.remove("is-open");

                });

        }
    );

}


/* =========================================================
   14. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

function initializeOutsideClick() {

    document.addEventListener(
        "click",
        function (event) {

            const navigation =
                document.querySelector(".main-navigation");

            const menuToggle =
                document.getElementById("menu-toggle");


            if (!navigation || !menuToggle) {
                return;
            }


            if (
                window.innerWidth <= 768 &&
                navigation.classList.contains("is-open") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   15. HANDLE WINDOW RESIZE
   ========================================================= */

function initializeResizeHandler() {

    let previousWidth =
        window.innerWidth;


    window.addEventListener(
        "resize",
        function () {

            const currentWidth =
                window.innerWidth;


            /*
             * When moving from mobile
             * to desktop.
             */

            if (
                previousWidth <= 768 &&
                currentWidth > 768
            ) {

                closeMobileMenu();

                closeSearch();

            }


            previousWidth =
                currentWidth;

        }
    );

}


/* =========================================================
   16. FOOTER YEAR
   ========================================================= */

function initializeFooter() {

    const yearElement =
        document.getElementById("current-year");


    if (!yearElement) {
        return;
    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   17. INITIALIZE EVERYTHING
   ========================================================= */

async function initializeWebsite() {

    /*
     * Load header and footer.
     */

    await Promise.all([
        loadHeader(),
        loadFooter()
    ]);


    /*
     * Global keyboard and
     * interaction controls.
     */

    initializeKeyboardControls();

    initializeOutsideClick();

    initializeResizeHandler();

}


/* =========================================================
   18. START WEBSITE
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );

} else {

    initializeWebsite();

                       }

