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

    // Tests pour la console de log
    function testLogConsole() {
        addLog('Test de la console de log.');
        const logs = document.getElementById('logs').children;
        if (logs.length > 0 && logs[logs.length - 1].textContent === 'Test de la console de log.') {
            console.log('Test de la console de log réussi.');
        } else {
            console.error('Test de la console de log échoué.');
        }
    }

    testLogConsole();

    // Tests pour la liste de tâches à cocher
    function testTaskList() {
        const taskItems = document.querySelectorAll('#task-list li');
        if (taskItems.length === 7) { // Assurez-vous que le nombre de tâches correspond
            console.log('Test de la liste de tâches réussi.');
        } else {
            console.error('Test de la liste de tâches échoué.');
        }
    }

    testTaskList();

    // Amélioration de l'intégration de la console de log
    function enhanceLogIntegration() {
        // Assure que la console de log capture tous les événements importants
        document.querySelectorAll('button, input, select').forEach(element => {
            element.addEventListener('click', function(event) {
                addLog(`Action déclenchée : ${event.target.tagName} - ${event.target.textContent || event.target.value}`);
            });
        });
    }

    enhanceLogIntegration();

    // Gestion des erreurs
    window.onerror = function(message, source, lineno, colno, error) {
        const errorMessage = `Erreur capturée : ${message} à ${source}:${lineno}:${colno}`;
        addLog(errorMessage);
        return true; // Prévient la propagation de l'erreur par défaut
    };
});
