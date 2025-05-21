document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("simulatedLogin") === "true";
    const username = localStorage.getItem("simulatedUsername") || "Gast";
    const navProfileButton = document.getElementById("navProfileButton");

    if (!isLoggedIn) {
        window.location.href = "./login.html";
        return;
    }

    if (navProfileButton) {
        navProfileButton.textContent = username;
        navProfileButton.href = "./profile.html";
    }

    const vehicleImageInput = document.getElementById("vehicleImage");
    const vehicleImagePreview = document.getElementById("vehicleImagePreview");
    let vehicleImageDataBase64 = null;

    if (vehicleImageInput && vehicleImagePreview) {
        vehicleImageInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    vehicleImagePreview.src = e.target.result;
                    vehicleImageDataBase64 = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                vehicleImagePreview.src =
                    "../ressources/images/car_placeholder.png";
                vehicleImageDataBase64 = null;
            }
        });
    }

    document
        .getElementById("addVehicleForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            const newVehicle = {
                id: Date.now(),
                name: document.getElementById("vehicleName").value,
                brand: document.getElementById("vehicleBrand").value,
                model: document.getElementById("vehicleModel").value,
                year: document.getElementById("vehicleYear").value,
                color: document.getElementById("vehicleColor").value,
                engine: document.getElementById("vehicleEngine").value,
                power: document.getElementById("vehiclePower").value,
                description:
                    document.getElementById("vehicleDescription").value,
                modifications: document.getElementById("vehicleModifications")
                    .value,
                imagePreviewUrl:
                    vehicleImageDataBase64 ||
                    "./ressources/images/placeholder-car.png",
            };

            let vehicles =
                JSON.parse(localStorage.getItem("userVehicles")) || [];
            vehicles.push(newVehicle);
            localStorage.setItem("userVehicles", JSON.stringify(vehicles));

            alert("Fahrzeug simuliert hinzugefügt!");
            window.location.href = "./profile.html";
        });
});
