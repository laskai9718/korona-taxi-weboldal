document.addEventListener('DOMContentLoaded', () => {
    const slideshowGroups = document.querySelectorAll('.slideshow-group');
    let currentGroupIndex = 0;

    // Megjeleníti a következő képsorozatot
    function showNextGroup() {
        slideshowGroups[currentGroupIndex].classList.remove('active');
        currentGroupIndex = (currentGroupIndex + 1) % slideshowGroups.length;
        slideshowGroups[currentGroupIndex].classList.add('active');
    }

    // Elindítja a diavetítést, 5 másodpercenként vált a képsorozat
    if (slideshowGroups.length > 1) {
        setInterval(showNextGroup, 5000);
    }
});