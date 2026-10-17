document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       CURRENT YEAR
    ================================================== */

    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* ==================================================
       ELEMENT REFERENCES
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const projectIntro =
        document.querySelector(".project-intro");

    const projectRevealItems =
        document.querySelectorAll(
            "#projects .reveal"
        );

    const scrollCue =
        document.getElementById(
            "floating-scroll-cue"
        );

    const menuToggle =
        document.getElementById(
            "menu-toggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    /* ==================================================
       GENERIC SCROLL REVEAL
    ================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        /*
                         * Each item only animates once
                         * during the current page state.
                         */
                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* ==================================================
       MOBILE HAMBURGER MENU
    ================================================== */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "open"
                    );

                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* ==================================================
       FIRST-SCREEN EXPLORE CUE
       + PROJECT INTRO REVEAL
    ================================================== */

    let introActivated = false;


    function activateProjectsIntro() {

        if (introActivated) {
            return;
        }

        introActivated = true;


        /*
         * Hide the first-screen cue.
         */
        if (scrollCue) {
            scrollCue.classList.add(
                "hidden"
            );
        }


        /*
         * Fade in the Projects heading.
         */
        if (projectIntro) {
            projectIntro.classList.add(
                "visible"
            );
        }


        /*
         * We only need to listen for the visitor's
         * first scroll.
         */
        window.removeEventListener(
            "scroll",
            handleOpeningScroll
        );

    }


    function handleOpeningScroll() {

        /*
         * Once the recruiter begins scrolling,
         * they already understand that the site
         * continues below the hero.
         */
        if (window.scrollY > 25) {
            activateProjectsIntro();
        }

    }


    /*
     * Clicking "Explore Projects" should trigger
     * the same visual transition.
     */
    if (scrollCue) {

        scrollCue.addEventListener(
            "click",
            () => {
                activateProjectsIntro();
            }
        );

    }


    /* ==================================================
       OPENING STATE / REFRESH BEHAVIOUR
    ================================================== */

    function showFreshOpeningState() {

        introActivated = false;


        /*
         * Hide the Projects intro again.
         */
        if (projectIntro) {

            projectIntro.classList.remove(
                "visible"
            );

        }


        /*
         * Reset the project cards so their
         * reveal animations can run again.
         */
        projectRevealItems.forEach((item) => {

            item.classList.remove(
                "visible"
            );

            /*
             * Re-observe in case the browser restored
             * the page from cache after it had already
             * animated previously.
             */
            revealObserver.observe(item);

        });


        /*
         * Bring back Explore Projects.
         */
        if (scrollCue) {

            scrollCue.classList.remove(
                "hidden"
            );

        }


        /*
         * Start listening for the first scroll again.
         */
        window.removeEventListener(
            "scroll",
            handleOpeningScroll
        );

        window.addEventListener(
            "scroll",
            handleOpeningScroll,
            {
                passive: true
            }
        );

    }


    function showReturningPageState() {

        introActivated = true;


        /*
         * Someone refreshed while already
         * farther down the page.
         *
         * Don't show the first-screen cue.
         */
        if (scrollCue) {

            scrollCue.classList.add(
                "hidden"
            );

        }


        /*
         * Projects heading should already be visible.
         */
        if (projectIntro) {

            projectIntro.classList.add(
                "visible"
            );

        }


        window.removeEventListener(
            "scroll",
            handleOpeningScroll
        );

    }


    function setCorrectPageState() {

        /*
         * If the browser is genuinely at the top,
         * treat this as the opening screen.
         */
        if (window.scrollY <= 40) {

            showFreshOpeningState();

        } else {

            /*
             * If Chrome restored the user's old
             * scroll position, preserve that position.
             */
            showReturningPageState();

        }

    }


    /*
     * Initial state.
     */
    setCorrectPageState();


    /*
     * pageshow is especially useful when Chrome
     * restores a page from its back/forward cache.
     */
    window.addEventListener(
        "pageshow",
        () => {

            /*
             * Allow the browser to finish restoring
             * its scroll position before checking it.
             */
            requestAnimationFrame(() => {
                setCorrectPageState();
            });

        }
    );

});

