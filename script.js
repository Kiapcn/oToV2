document.addEventListener("DOMContentLoaded", function () {
    console.log("oToV2 Base Project Loaded");

    // Fonction pour ajouter un log à la console interactive
    window.addLog = function(message, type = 'info') {
        const logContainer = document.getElementById('logs');
        if (logContainer) {
            const logEntry = document.createElement('div');
            const timestamp = new Date().toLocaleTimeString();
            
            // Définir la classe CSS selon le type de log
            logEntry.className = `log-entry log-${type}`;
            
            // Formater le message selon le type
            let icon = '📝';
            switch(type) {
                case 'error':
                    icon = '❌';
                    break;
                case 'warning':
                    icon = '⚠️';
                    break;
                case 'success':
                    icon = '✅';
                    break;
                case 'info':
                default:
                    icon = 'ℹ️';
            }
            
            // Si le message est une erreur, afficher plus de détails
            if (type === 'error' && message instanceof Error) {
                logEntry.innerHTML = `
                    <span class="log-time">[${timestamp}]</span>
                    <span class="log-icon">${icon}</span>
                    <span class="log-message">
                        <strong>Erreur:</strong> ${message.message}<br>
                        <details>
                            <summary>Détails de l'erreur</summary>
                            <pre>${message.stack}</pre>
                        </details>
                    </span>
                `;
            } else {
                logEntry.innerHTML = `
                    <span class="log-time">[${timestamp}]</span>
                    <span class="log-icon">${icon}</span>
                    <span class="log-message">${message}</span>
                `;
            }
            
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
        // Aussi logger dans la console du navigateur
        switch(type) {
            case 'error':
                console.error(message);
                break;
            case 'warning':
                console.warn(message);
                break;
            default:
                console.log(message);
        }
    };

    // Initialisation du contrôle RunPod
    try {
        const runpodControl = new RunPodControl('runpod-control-container');
        window.addLog("RunPod Control initialisé", 'info');
    } catch (error) {
        window.addLog(error, 'error');
    }

    // Initialisation du contrôle Cursor
    try {
        const cursorControl = new CursorUsageControl('cursor-control-container');
        window.addLog("Cursor Usage Control initialisé", 'success');
    } catch (error) {
        window.addLog(error, 'error');
    }

    // Gestion des tâches à cocher
    const checkboxes = document.querySelectorAll('#task-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const task = checkbox.parentElement.textContent.trim();
            if (checkbox.checked) {
                window.addLog(`Tâche terminée : ${task}`);
            } else {
                window.addLog(`Tâche décochée : ${task}`);
            }
        });

        // Ajouter le clic sur la tâche pour afficher/masquer les détails
        const taskItem = checkbox.parentElement;
        taskItem.style.cursor = 'pointer';
        const details = taskItem.querySelector('div');
        if (details) {
            taskItem.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    details.style.display = details.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    });

    // Tests pour la console de log
    function testLogConsole() {
        window.addLog('Test de la console de log.', 'info');
        const logs = document.getElementById('logs').children;
        if (logs.length > 0) {
            console.log('Test de la console de log réussi.');
            window.addLog('Test de la console de log réussi.', 'success');
        } else {
            console.error('Test de la console de log échoué.');
            window.addLog('Test de la console de log échoué.', 'error');
        }
    }

    // Tests pour la liste de tâches à cocher
    function testTaskList() {
        const taskItems = document.querySelectorAll('#task-list li');
        if (taskItems.length === 7) {
            window.addLog('Test de la liste de tâches réussi.', 'success');
        } else {
            window.addLog('Test de la liste de tâches échoué.', 'error');
        }
    }

    // Exécution des tests
    setTimeout(() => {
        testLogConsole();
        testTaskList();
    }, 1000);

    // Gestion des erreurs globale
    window.onerror = function(message, source, lineno, colno, error) {
        const errorMessage = `Erreur capturée : ${message} à ${source}:${lineno}:${colno}`;
        window.addLog(errorMessage, 'error');
        return true; // Prévient la propagation de l'erreur par défaut
    };
});
