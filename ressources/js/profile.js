document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("simulatedLogin") === "true";
    const username = localStorage.getItem("simulatedUsername");
    const userBio = localStorage.getItem("simulatedBio");
    const userAvatarUrl = localStorage.getItem("simulatedAvatarUrl");

    const navProfileButton = document.getElementById("navProfileButton");

    if (!isLoggedIn) {
        window.location.href = "./login.html";
        return;
    }

    if (navProfileButton) {
        navProfileButton.textContent = username || "Profil";
        navProfileButton.href = "./profile.html";
    }

    const usernameElement = document.getElementById("profileUsername");
    const bioElement = document.getElementById("profileBio");
    const avatarElement = document.getElementById("profileAvatar");
    const descriptionElement = document.getElementById("profileDescription");

    if (usernameElement)
        usernameElement.textContent = username || "Unbekannter Benutzer";
    if (bioElement)
        bioElement.textContent =
            userBio ||
            'Keine Bio angegeben. Klicke auf "Profil bearbeiten", um eine hinzuzufügen!';
    if (descriptionElement)
        descriptionElement.textContent =
            userBio || "Keine ausführliche Beschreibung vorhanden.";
    if (avatarElement && userAvatarUrl) {
        avatarElement.src = userAvatarUrl;
    } else if (avatarElement) {
        avatarElement.src = "../ressources/images/profile.png";
    }

    const carsContainer = document.getElementById("profileCarsContainer");
    const vehiclesString = localStorage.getItem("userVehicles");
    let vehicles = [];

    if (vehiclesString) {
        try {
            vehicles = JSON.parse(vehiclesString);
        } catch (e) {
            console.error(
                "Fehler beim Parsen der Fahrzeuge aus localStorage:",
                e
            );
            vehicles = [];
        }
    }

    if (carsContainer) {
        carsContainer.innerHTML = "";
        if (vehicles.length > 0) {
            vehicles.forEach((car) => {
                const carImage =
                    car.imagePreviewUrl ||
                    "./ressources/images/placeholder-car.png";
                const carCardHtml = `
                                <div class="col">
                                    <div class="card car-card h-100">
                                        <img src="${carImage}" class="card-img-top" alt="${
                    car.name || "Fahrzeug"
                }">
                                        <div class="card-body">
                                            <h5 class="card-title">${
                                                car.name ||
                                                "Unbenanntes Fahrzeug"
                                            }</h5>
                                            <p class="card-text">${
                                                car.description ||
                                                "Keine Details."
                                            }</p>
                                            ${
                                                car.id
                                                    ? `<a href="./sites/cars/car-detail-sim.html?id=${car.id}" class="btn btn-sm btn-danger">Details ansehen (Sim)</a>`
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            `;
                carsContainer.insertAdjacentHTML("beforeend", carCardHtml);
            });
        } else {
            carsContainer.innerHTML =
                '<div class="col"><p>Du hast noch keine Fahrzeuge hinzugefügt. <a href="add-vehicle.html" class="link-light">Jetzt eins hinzufügen!</a></p></div>';
        }
    }

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("simulatedLogin");
            localStorage.removeItem("simulatedUsername");
            localStorage.removeItem("simulatedBio");
            localStorage.removeItem("simulatedAvatarUrl");
            localStorage.removeItem("userVehicles");
            window.location.href = "./login.html";
        });
    }
});
