// === Introducere scoruri finale ===
function actualizeazaScor(idMeci, scorGazde, scorOaspeti) {
    const meciuri = JSON.parse(localStorage.getItem("meciuri")) || [];
    const meci = meciuri.find(m => m.id === idMeci);
    
    if (meci) {
        meci.scorGazde = scorGazde;
        meci.scorOaspeti = scorOaspeti;
        meci.jucat = true;
        localStorage.setItem("meciuri", JSON.stringify(meciuri));
        afiseazaMeciuri(); // actualizează automat lista de meciuri
    }
}
