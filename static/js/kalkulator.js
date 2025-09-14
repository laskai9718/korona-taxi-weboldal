document.addEventListener('DOMContentLoaded', () => {
    // ÚJ: Tarifacsomagok egy objektumban
    const TARIFCSOMAGOK = {
        lakossagi: {
            alapdij: 1100,
            kilometerdij: 440,
            varakozasidij: 110,
            nev: 'Lakossági'
        },
        torzsutas: {
            alapdij: 1000,      // Kedvezményes alapdíj
            kilometerdij: 420,  // Kedvezményes km díj
            varakozasidij: 100, // Kedvezményes várakozási díj
            nev: 'Törzsutas'
        }
    };

    // Alapértelmezett tarifacsomag
    let aktivTarifCsomag = 'lakossagi';

    // Elemek elérése
    const distanceInput = document.getElementById('distance');
    const waitingTimeInput = document.getElementById('waitingTime');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('result');

    // ÚJ: A díjszabás táblázat és a váltógombok elérése
    const priceAlapdijElem = document.getElementById('price-alapdij');
    const priceKmElem = document.getElementById('price-km');
    const priceVarakozasElem = document.getElementById('price-varakozas');
    const btnLakossagi = document.getElementById('btn-lakossagi');
    const btnTorzsutas = document.getElementById('btn-torzsutas');

    // ÚJ: Függvény a díjszabás táblázat frissítésére
    function updatePriceTable() {
        const csomag = TARIFCSOMAGOK[aktivTarifCsomag];

        // Árak frissítése a táblázatban
        priceAlapdijElem.textContent = `${csomag.alapdij} Ft`;
        priceKmElem.textContent = `${csomag.kilometerdij} Ft/km`;
        priceVarakozasElem.textContent = `${csomag.varakozasidij} Ft/perc`;

        // Gombok 'active' class-ának kezelése
        if (aktivTarifCsomag === 'lakossagi') {
            btnLakossagi.classList.add('active');
            btnTorzsutas.classList.remove('active');
        } else {
            btnTorzsutas.classList.add('active');
            btnLakossagi.classList.remove('active');
        }
        
        // Újraszámoljuk az árat a kalkulátorban, ha már van beírt érték
        calculatePrice();
    }

    // MÓDOSÍTOTT: Számítási funkció
    function calculatePrice() {
        const distance = parseFloat(distanceInput.value) || 0;
        const waitingTime = parseFloat(waitingTimeInput.value) || 0;
        
        // MÓDOSÍTÁS: Az aktív tarifacsomagot használja a számításhoz
        const aktivCsomag = TARIFCSOMAGOK[aktivTarifCsomag];

        if (distance <= 0) {
            resultDisplay.textContent = "0 Ft";
            return;
        }

        const travelCost = aktivCsomag.alapdij + (distance * aktivCsomag.kilometerdij);
        const waitingCost = waitingTime * aktivCsomag.varakozasidij;
        const totalCost = Math.round(travelCost + waitingCost);

        const formattedCost = new Intl.NumberFormat('hu-HU').format(totalCost);
        resultDisplay.textContent = `kb. ${formattedCost} Ft`;
    }

    // Eseményfigyelők
    calculateBtn.addEventListener('click', calculatePrice);
    
    // ÚJ: Eseményfigyelők a váltógombokra
    btnLakossagi.addEventListener('click', () => {
        aktivTarifCsomag = 'lakossagi';
        updatePriceTable();
    });

    btnTorzsutas.addEventListener('click', () => {
        aktivTarifCsomag = 'torzsutas';
        updatePriceTable();
    });

    // Oldal betöltésekor is frissítjük a táblázatot az alapértelmezett értékekkel
    updatePriceTable();
});