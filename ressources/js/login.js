document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const emailInput = document.getElementById("loginEmail").value;
        const passwordInput = document.getElementById("loginPassword").value;

        if (emailInput.trim() !== "" && passwordInput.trim() !== "") {
            localStorage.setItem("simulatedLogin", "true");
            localStorage.setItem("simulatedUsername", emailInput.split("@")[0]);
            window.location.href = "./profile.html";
        } else {
            alert("Bitte geben Sie E-Mail/Benutzername und Passwort ein.");
        }
    });

const navProfileButtonLogin = document.getElementById("navProfileButton");
if (navProfileButtonLogin) {
    navProfileButtonLogin.textContent = "Login";
    navProfileButtonLogin.href = "./login.html";
}
