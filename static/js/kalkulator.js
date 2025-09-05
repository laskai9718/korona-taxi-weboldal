document.addEventListener('DOMContentLoaded', () => {
    // Tarifák (ezeknek egyezniük kell a HTML táblázatban lévő árakkal)
    const TARIFA = {
        alapdij: 1100,      // Ft
        kilometerdij: 440,  // Ft/km
        varakozasidij: 110  // Ft/perc
    };

    // Elemek elérése
    const distanceInput = document.getElementById('distance');
    const waitingTimeInput = document.getElementById('waitingTime');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('result');

    // Számítási funkció
    function calculatePrice() {
        // Értékek beolvasása és számmá alakítása
        const distance = parseFloat(distanceInput.value) || 0;
        const waitingTime = parseFloat(waitingTimeInput.value) || 0;

        // Ellenőrzés, hogy a távolság meg van-e adva
        if (distance <= 0) {
            resultDisplay.textContent = "0 Ft";
            return; // Ne számoljon, ha nincs távolság
        }

        // Költség számítása
        const travelCost = TARIFA.alapdij + (distance * TARIFA.kilometerdij);
        const waitingCost = waitingTime * TARIFA.varakozasidij;
        const totalCost = Math.round(travelCost + waitingCost);

        // Eredmény formázása és kiírása
        const formattedCost = new Intl.NumberFormat('hu-HU').format(totalCost);
        resultDisplay.textContent = `kb. ${formattedCost} Ft`;
    }

    // Eseményfigyelő a gombra
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePrice);
    }
});