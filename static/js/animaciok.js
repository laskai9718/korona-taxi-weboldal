document.addEventListener('DOMContentLoaded', () => {

    // 1. Kiválasztjuk az összes elemet, amit animálni szeretnénk
    const fadeInElements = document.querySelectorAll('.fade-in-element');

    // 2. Beállítások az "Intersection Observer"-hez
    const observerOptions = {
        root: null, // A viewport-ot (a böngésző ablakát) figyeljük
        rootMargin: '0px',
        threshold: 0.1 // Akkor aktiválódjon, ha az elem legalább 10%-a látható
    };

    // 3. Létrehozzuk az Observer-t
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Ha az elem megjelent a képernyőn...
            if (entry.isIntersecting) {
                // ...hozzáadjuk a 'is-visible' classt, ami elindítja a CSS animációt
                entry.target.classList.add('is-visible');
                // ...és leállítjuk a figyelését, hogy az animáció ne ismétlődjön
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Elindítjuk a figyelést minden kiválasztott elemen
    fadeInElements.forEach(element => {
        observer.observe(element);
    });

});