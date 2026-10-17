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

    const imageButtons =
        document.querySelectorAll(
            ".image-zoom-trigger"
        );


    if (imageButtons.length > 0) {

        const lightbox =
            document.createElement("div");

        lightbox.className =
            "image-lightbox";

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        lightbox.innerHTML = `
            <button
                class="image-lightbox-close"
                type="button"
                aria-label="Close enlarged image"
            >
                ×
            </button>

            <img
                class="image-lightbox-image"
                src=""
                alt=""
            >
        `;


        document.body.appendChild(lightbox);


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
                image.src;

            lightboxImage.alt =
                image.alt || "";

            lightbox.classList.add(
                "open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "lightbox-open"
            );

            closeButton.focus();

        }


        function closeLightbox() {

            lightbox.classList.remove(
                "open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "lightbox-open"
            );

        }


        imageButtons.forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const image =
                        button.querySelector("img");

                    if (image) {
                        openLightbox(image);
                    }

                }
            );

        });


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            (event) => {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );


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