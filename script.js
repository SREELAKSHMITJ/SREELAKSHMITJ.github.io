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
       GENERIC SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        /*
                         * Reveal each item once.
                         */
                        observer.unobserve(
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
       PROJECT INTRO REVEAL
    ==================================================

       The Projects heading has its own reveal class
       instead of the generic .reveal class.

       It now works independently on desktop,
       laptop, tablet and mobile.
    ================================================== */

    const projectIntro =
        document.querySelector(".project-intro");


    if (projectIntro) {

        const projectIntroObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -35px 0px"
                }
            );


        projectIntroObserver.observe(
            projectIntro
        );

    }


    /* ==================================================
       MOBILE HAMBURGER MENU
    ================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const mobileMenu =
        document.getElementById("mobile-menu");


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
       PROJECT IMAGE LIGHTBOX
    ================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img, .project-gallery img"
        );


    if (projectImages.length > 0) {

        /*
         * Create one reusable lightbox.
         */

        const lightbox =
            document.createElement("div");

        lightbox.className = "image-lightbox";

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        lightbox.innerHTML = `
            <button
                class="image-lightbox-close"
                type="button"
                aria-label="Close image"
            >
                ×
            </button>

            <img
                class="image-lightbox-image"
                src=""
                alt=""
            >
        `;


        document.body.appendChild(
            lightbox
        );


        const lightboxImage =
            lightbox.querySelector(
                ".image-lightbox-image"
            );


        const closeButton =
            lightbox.querySelector(
                ".image-lightbox-close"
            );


        function openLightbox(image) {

            lightboxImage.src =
                image.getAttribute("src");

            lightboxImage.alt =
                image.getAttribute("alt") || "";


            lightbox.classList.add("open");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "lightbox-open"
            );

        }


        function closeLightbox() {

            lightbox.classList.remove("open");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "lightbox-open"
            );


            /*
             * Clear image after animation.
             */

            window.setTimeout(
                () => {

                    if (
                        !lightbox.classList.contains(
                            "open"
                        )
                    ) {

                        lightboxImage.src = "";

                    }

                },
                250
            );

        }


        projectImages.forEach((image) => {

            image.setAttribute(
                "tabindex",
                "0"
            );

            image.setAttribute(
                "role",
                "button"
            );


            image.addEventListener(
                "click",
                (event) => {

                    /*
                     * Prevent the existing image link
                     * from opening a new browser tab.
                     */

                    event.preventDefault();

                    openLightbox(image);

                }
            );


            /*
             * Keyboard accessibility.
             */

            image.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        openLightbox(image);

                    }

                }
            );

        });


        /*
         * Close button.
         */

        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        /*
         * Clicking the dark area closes it.
         */

        lightbox.addEventListener(
            "click",
            (event) => {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );


        /*
         * ESC closes it.
         */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains(
                        "open"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }

});