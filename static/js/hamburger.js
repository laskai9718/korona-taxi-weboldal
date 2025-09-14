// ... a meglévő animációs kódjaid után ...

// HAMBURGER MENÜ LOGIKA
const hamburgerToggle = document.getElementById('hamburger-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

if (hamburgerToggle && mainNav) {
    // Gombnyomásra megjeleníti/elrejti a menüt
    hamburgerToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-active');
    });

    // Ha egy menüpontra kattintunk, a menü csukódjon be
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('is-active');
        });
    });
}