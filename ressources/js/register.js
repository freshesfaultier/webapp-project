document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const usernameInput = document.getElementById("registerUsername").value;
        const emailInput = document.getElementById("registerEmail").value;
        const passwordInput = document.getElementById("registerPassword").value;
        const confirmPasswordInput =
            document.getElementById("confirmPassword").value;

        if (
            !usernameInput.trim() ||
            !emailInput.trim() ||
            !passwordInput.trim() ||
            !confirmPasswordInput.trim()
        ) {
            alert("Bitte fülle alle Felder aus.");
            return;
        }
        if (passwordInput !== confirmPasswordInput) {
            alert("Die Passwörter stimmen nicht überein.");
            return;
        }
        alert(
            "Registrierung simuliert! Du wirst zur Login-Seite weitergeleitet."
        );
        window.location.href = "./login.html";
    });

const navProfileButtonRegister = document.getElementById("navProfileButton");
if (navProfileButtonRegister) {
    navProfileButtonRegister.textContent = "Login";
    navProfileButtonRegister.href = "./login.html";
}
