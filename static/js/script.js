// AOS (Animate On Scroll) inicializálása
AOS.init({
    duration: 1000,
    easing: 'ease-out-quad',
    once: true
});

// Lightbox beállítások
lightbox.option({
    'albumLabel': 'Kép %1/%2',
    'fadeDuration': 400,
    'resizeDuration': 600,
    'wrapAround': true
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Fejléc zsugorítás görgetéskor ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('shrink', window.scrollY > 50);
        });
    }

    // --- Vissza a lap tetejére gomb logikája ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('show', window.scrollY > 300);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- ÚJ: Csúszó Galéria (Slideshow) logikája ---
    const slideshowTrack = document.querySelector('.slideshow-track');
    const slideGroups = document.querySelectorAll('.slideshow-group');
    if (slideshowTrack && slideGroups.length > 1) {
        let currentGroupIndex = 0;
        const totalGroups = slideGroups.length;

        function showNextGroup() {
            currentGroupIndex = (currentGroupIndex + 1) % totalGroups;
            const offset = -currentGroupIndex * 100; // Eltolás %-ban
            slideshowTrack.style.transform = `translateX(${offset}%)`;
        }
        
        setInterval(showNextGroup, 5000); // 5 másodpercenként vált
    }
});