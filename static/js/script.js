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

    // --- Mobil menü logikája ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavLinks = document.getElementById('main-nav-links');
    if (mobileMenuToggle && mainNavLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNavLinks.classList.toggle('active');
        });
    }

    // --- Csúszó Galéria (Slideshow) logikája ---
    const slideshowTrack = document.querySelector('.slideshow-track');
    const slideGroups = document.querySelectorAll('.slideshow-group');
    if (slideshowTrack && slideGroups.length > 1) {
        let currentGroupIndex = 0;
        const totalGroups = slideGroups.length;

        function showNextGroup() {
            currentGroupIndex = (currentGroupIndex + 1) % totalGroups;
            const offset = -currentGroupIndex * 100;
            slideshowTrack.style.transform = `translateX(${offset}%)`;
        }
        
        setInterval(showNextGroup, 5000);
    }

    // --- E-mail küldés visszajelzés ---
    const urlParams = new URLSearchParams(window.location.search);
    const isSuccess = urlParams.get('success');

    if (isSuccess === 'true') {
        alert('Köszönjük! Az üzenet sikeresen elküldve.');
    } else if (isSuccess === 'false') {
        alert('Hiba történt az üzenet elküldése során. Kérjük, próbálja újra.');
    }

    // =======================================================
    // --- Sötét Mód Logika (Bővített verzió) ---
    // =======================================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const logoImg = document.querySelector('.logo-container .logo-img');
    const darkModeLogo = 'static/images/koronalogo2.png'; // Új logó sötét módhoz
    const lightModeLogo = 'static/images/koronalogo.png'; // Eredeti logó

    // Funkció, ami beállítja a témát (CSS osztályt és logót)
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if(logoImg) logoImg.src = darkModeLogo;
        } else {
            body.classList.remove('dark-mode');
            if(logoImg) logoImg.src = lightModeLogo;
        }
    };

    // Ellenőrizzük, van-e mentett téma a böngészőben (localStorage)
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Ha van mentett téma, azt használjuk
        applyTheme(savedTheme);
    } else {
        // Ha nincs mentett téma, a rendszerbeállítást nézzük
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Kattintás esemény a sötét mód gombra
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            // Megfordítjuk a jelenlegi állapotot
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            
            // Elmentjük az új állapotot, hogy megmaradjon
            localStorage.setItem('theme', newTheme);
        });
    }
});

// A window.load eseménykezelőt a DOMContentLoaded-en kívülre helyezzük,
// mert a load csak az összes erőforrás (képek, stb.) betöltődése után sül el.
window.addEventListener('load', () => {
    // --- Betöltő képernyő (preloader) elrejtése ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Kis késleltetés, hogy ne villanjon be a tartalom túl hamar
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => preloader.style.display = 'none');
        }, 200);
    }
});