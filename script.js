document.addEventListener("DOMContentLoaded", function () {
    console.log("oToV2 Base Project Loaded");

    function logMessage(message) {
        const consoleOutput = document.getElementById("console-output");
        const newMessage = document.createElement("p");
        newMessage.textContent = message;
        consoleOutput.appendChild(newMessage);
    }

    logMessage("Bienvenue sur oToV2 - Console de log active.");

    // Fonction pour ajouter un log à la console interactive
    function addLog(message) {
        const logContainer = document.getElementById('logs');
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    // Exemple d'utilisation
    addLog('Projet initialisé.');

    // Gestion des tâches à cocher
    const checkboxes = document.querySelectorAll('#task-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const task = checkbox.parentElement.textContent.trim();
            if (checkbox.checked) {
                addLog(`Tâche terminée : ${task}`);
            } else {
                addLog(`Tâche décochée : ${task}`);
            }
        });
    });
});
