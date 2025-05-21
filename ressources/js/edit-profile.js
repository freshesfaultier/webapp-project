document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("simulatedLogin") === "true";
    const username = localStorage.getItem("simulatedUsername");
    const userBio =
        localStorage.getItem("simulatedBio") ||
        "Auto-Enthusiast | Schrauber | Petrolhead";
    const userAvatar =
        localStorage.getItem("simulatedAvatarUrl") ||
        "../ressources/images/profile.png";
    const userEmail = "benutzer@example.com";

    const navProfileButton = document.getElementById("navProfileButton");

    if (!isLoggedIn) {
        window.location.href = "./login.html";
        return;
    }

    if (navProfileButton) {
        navProfileButton.textContent = username || "Profil";
        navProfileButton.href = "./profile.html";
    }

    if (username) document.getElementById("username").value = username;
    document.getElementById("email").value = userEmail;
    document.getElementById("bio").value = userBio; // .value für textarea
    document.getElementById("profilePicturePreview").src = userAvatar;

    document
        .getElementById("editProfileForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            const newUsername = document.getElementById("username").value;
            const newBio = document.getElementById("bio").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmNewPassword =
                document.getElementById("confirmNewPassword").value;

            if (newPassword && newPassword !== confirmNewPassword) {
                alert("Die neuen Passwörter stimmen nicht überein!");
                return;
            }

            localStorage.setItem("simulatedUsername", newUsername);
            localStorage.setItem("simulatedBio", newBio);

            const profilePictureFile =
                document.getElementById("profilePicture").files[0];
            if (profilePictureFile) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    localStorage.setItem("simulatedAvatarUrl", reader.result);
                    alert("Profiländerungen simuliert gespeichert! (Mit Bild)");
                    window.location.href = "./profile.html";
                };
                reader.readAsDataURL(profilePictureFile);
            } else {
                alert(
                    "Profiländerungen simuliert gespeichert! (Ohne neues Bild)"
                );
                window.location.href = "./profile.html";
            }
        });

    const profilePictureInput = document.getElementById("profilePicture");
    const profilePicturePreview = document.getElementById(
        "profilePicturePreview"
    );
    if (profilePictureInput && profilePicturePreview) {
        profilePictureInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePicturePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
