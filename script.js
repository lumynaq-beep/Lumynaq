/* ==================================================
   LUMYNAQ
   Navigation + Smooth UI
================================================== */

"use strict";


/* ==================================================
   MOBILE NAVIGATION
================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");


function closeMenu() {
    navMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );
}


function openMenu() {
    navMenu.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );
}


menuToggle.addEventListener("click", () => {

    const isOpen =
        navMenu.classList.contains("active");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

});


/* Close menu after navigation */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {
        closeMenu();
    });

});


/* Close menu when clicking outside */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navMenu.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clickedInsideMenu) {
        closeMenu();
    }

});


/* ==================================================
   ACTIVE NAVIGATION
================================================== */

const sections = document.querySelectorAll(
    "main section[id]"
);

const observerOptions = {
    root: null,
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
};


const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink =
                document.querySelector(
                    `.nav-menu a[href="#${entry.target.id}"]`
                );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        });

    },
    observerOptions
);


sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* ==================================================
   ESC KEY
================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* ==================================================
   RESIZE SAFETY
================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 760) {
        closeMenu();
    }

});
