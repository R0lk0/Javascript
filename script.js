// Autó keresése ID alapján
function fetching(id) {
    // alapellenőrzés
    if (id === "") {
        kiirHibat("Adj meg egy ID-t!");
        return;
    }

    fetch("https://surveys-5jvt.onrender.com/api/cars/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Nem sikerült lekérni az adatokat");
            }
            return response.json();
        })
        .then(cars => {
            // cars = tömb
            const car = cars.find(c => c.id == id);

            if (!car) {
                kiirHibat("Nincs ilyen azonosítójú autó");
                torolMegjelenitest();
                return;
            }

            torolHibat();
            megjelenites(car);
        })
        .catch(error => {
            kiirHibat("Hiba történt: " + error.message);
            torolMegjelenitest();
        });
}

// Adatok megjelenítése
function megjelenites(adatok) {
    document.getElementById("id").textContent = "ID: " + adatok.id;
    document.getElementById("model").textContent = "Model: " + adatok.model;
    document.getElementById("brand").textContent = "Brand: " + adatok.brand;
    document.getElementById("year").textContent = "Year: " + adatok.year;
}

// Keresés indítása gombbal
function kereses() {
    const id = document.getElementById("userID").value.trim();
    fetching(id);
}

// Hibák kiírása
function kiirHibat(uzenet) {
    document.getElementById("errorOutput").textContent = uzenet;
}

// Hiba törlése
function torolHibat() {
    document.getElementById("errorOutput").textContent = "";
}

// Korábbi adatok törlése
function torolMegjelenitest() {
    document.getElementById("id").textContent = "";
    document.getElementById("model").textContent = "";
    document.getElementById("brand").textContent = "";
    document.getElementById("year").textContent = "";
}