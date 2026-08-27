/* =========================================================
   LUMYNAQ
   SMART PRODUCT DISCOVERY WEBSITE
   RESPONSIVE NAVIGATION + UI
========================================================= */

"use strict";


/* =========================================================
   ELEMENT REFERENCES
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-menu a");

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {

    if (!navMenu || !menuToggle) {
        return;
    }

    navMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open menu"
    );

}


function openMenu() {

    if (!navMenu || !menuToggle) {
        return;
    }

    navMenu.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close menu"
    );

}


/* =========================================================
   MENU BUTTON
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const isOpen =
                navMenu.classList.contains("active");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );

}


/* =========================================================
   CLOSE AFTER NAVIGATION
========================================================= */

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    }
);


/* =========================================================
   CLOSE WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!navMenu || !menuToggle) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

if (
    sections.length > 0 &&
    navLinks.length > 0 &&
    "IntersectionObserver" in window
) {

    const observerOptions = {

        root: null,

        rootMargin:
            "-30% 0px -60% 0px",

        threshold: 0

    };


    const sectionObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        navLinks.forEach(
                            function (link) {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const activeLink =
                            document.querySelector(
                                '.nav-menu a[href="#' +
                                entry.target.id +
                                '"]'
                            );


                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    }
                );

            },
            observerOptions
        );


    sections.forEach(
        function (section) {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================================
   NEW FEATURE
   SCROLL PROGRESS BAR
========================================================= */

let progressBar =
    document.querySelector(
        ".scroll-progress"
    );


/*
   If the HTML does not already contain
   .scroll-progress, create it automatically.
*/

if (!progressBar) {

    progressBar =
        document.createElement("div");

    progressBar.className =
        "scroll-progress";

    document.body.prepend(
        progressBar
    );

}


/* =========================================================
   UPDATE SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    if (!progressBar) {
        return;
    }


    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;


    const documentHeight =
        document.documentElement.scrollHeight;


    const windowHeight =
        window.innerHeight;


    const scrollableHeight =
        documentHeight -
        windowHeight;


    if (scrollableHeight <= 0) {

        progressBar.style.width =
            "0%";

        return;

    }


    let progress =
        (scrollTop / scrollableHeight) *
        100;


    progress =
        Math.min(
            100,
            Math.max(0, progress)
        );


    progressBar.style.width =
        progress + "%";

}


let scrollTicking = false;


window.addEventListener(
    "scroll",
    function () {

        if (!scrollTicking) {

            window.requestAnimationFrame(
                function () {

                    updateScrollProgress();

                    scrollTicking = false;

                }
            );

            scrollTicking = true;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   RESIZE SAFETY
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    function () {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                function () {

                    if (
                        window.innerWidth > 760
                    ) {

                        closeMenu();

                    }


                    updateScrollProgress();

                },
                120
            );

    }
);


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    !href.startsWith("#") ||
                    href === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({

                    top:
                        Math.max(
                            0,
                            targetPosition
                        ),

                    behavior:
                        "smooth"

                });

            }
        );

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    function () {

        closeMenu();

        updateScrollProgress();

    }
);


/* =========================================================
   INITIAL UPDATE
========================================================= */

updateScrollProgress();
