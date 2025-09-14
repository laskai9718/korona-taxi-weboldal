
// LOGÓ FORGATÁS LOGIKA
const flippableLogo = document.getElementById('flippable-logo');
if (flippableLogo) { // Csak akkor fut le, ha az elem létezik
    flippableLogo.addEventListener('click', () => {
        const logoCard = flippableLogo.querySelector('.logo-card');
        logoCard.classList.toggle('is-flipped');
    });
}