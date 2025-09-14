
// SÖTÉT MÓD VÁLTÓ LOGIKA
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

// Ellenőrizzük, van-e elmentett téma a böngésző memóriájában
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

// Gombnyomásra váltunk
darkModeToggle.addEventListener('click', () => {
    // Ha már van sötét téma beállítva...
    if (htmlElement.hasAttribute('data-theme')) {
        // ...akkor eltávolítjuk (vissza a világosra)
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        // ...egyébként beállítjuk a sötét témát
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});