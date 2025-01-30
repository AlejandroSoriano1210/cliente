document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".cerrar");
    const images = document.querySelectorAll(".disparador");

    images.forEach(img => {
        img.addEventListener("click", function () {
            lightbox.style.display = "flex";
            lightboxImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
        lightboxImg.classList.remove("zoom");
    });

    lightboxImg.addEventListener("click", function () {
        this.classList.toggle("zoom");
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target !== lightboxImg) {
            lightbox.style.display = "none";
            lightboxImg.classList.remove("zoom");
        }
    });
});
