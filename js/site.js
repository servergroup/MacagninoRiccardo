document.addEventListener("DOMContentLoaded", () => {
    const mobileBreakpoint = 768;
    const headers = document.querySelectorAll("[data-site-header]");

    headers.forEach((header) => {
        const toggle = header.querySelector("[data-menu-toggle]");
        const panel = header.querySelector("[data-nav-panel]");

        if (!toggle || !panel) {
            return;
        }

        const closeMenu = () => {
            panel.classList.remove("is-open");
            header.classList.remove("menu-open");
            toggle.setAttribute("aria-expanded", "false");
        };

        toggle.addEventListener("click", () => {
            const isOpen = panel.classList.toggle("is-open");
            header.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        panel.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= mobileBreakpoint) {
                    closeMenu();
                }
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > mobileBreakpoint) {
                closeMenu();
            }
        });
    });

    const thumbs = document.querySelectorAll("[data-cert-thumb]");
    const previewImage = document.querySelector("[data-cert-image]");
    const previewTitle = document.querySelector("[data-cert-title]");
    const previewDescription = document.querySelector("[data-cert-description]");
    const previewDownload = document.querySelector("[data-cert-download]");

    if (!thumbs.length || !previewImage || !previewTitle || !previewDescription || !previewDownload) {
        return;
    }

    const selectThumb = (thumb) => {
        thumbs.forEach((item) => item.classList.remove("is-active"));
        thumb.classList.add("is-active");

        previewImage.src = thumb.dataset.image || "";
        previewImage.alt = thumb.dataset.title || "Anteprima certificazione";
        previewTitle.textContent = thumb.dataset.title || "Certificazione";
        previewDescription.textContent = thumb.dataset.description || "Visualizza la certificazione selezionata.";
        previewDownload.href = thumb.dataset.pdf || "#";
    };

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => selectThumb(thumb));

        if (index === 0) {
            selectThumb(thumb);
        }
    });
});
