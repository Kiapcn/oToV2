document.addEventListener("DOMContentLoaded", function () {
    console.log("oToV2 Base Project Loaded");

    function logMessage(message) {
        const consoleOutput = document.getElementById("console-output");
        const newMessage = document.createElement("p");
        newMessage.textContent = message;
        consoleOutput.appendChild(newMessage);
    }

    logMessage("Bienvenue sur oToV2 - Console de log active.");
});
