// Composant RunPodControl
class RunPodControl {
    constructor(containerId = 'runpod-control-container') {
        this.status = 'Checking...';
        this.startTime = null;
        this.cost = 0;
        this.containerId = containerId;
        this.endpointId = window.runpodConfig?.endpointId;
        this.apiKey = window.runpodConfig?.apiKey;
        this.initializeUI();
        this.checkInitialStatus();
        // Vérifier le statut toutes les 30 secondes
        setInterval(() => this.checkStatus(), 30000);
    }

    async makeRequest(url, method = 'GET') {
        try {
            // Construire l'URL correctement
            const endpoint = url.includes('/status') ? 'status' : 
                           url.includes('/start') ? 'start' :
                           url.includes('/stop') ? 'stop' : '';
            
            // Utiliser l'URL du proxy avec le bon format
            const proxyUrl = `http://localhost:3000/api/endpoint/${this.endpointId}/${endpoint}`;
            
            window.addLog(`Tentative de connexion à : ${proxyUrl}`, 'info');
            
            const response = await fetch(proxyUrl, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP error! status: ${response.status}\nResponse: ${errorData}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`RunPod API error (${method} ${url}):`, error);
            window.addLog(error, 'error');
            this.setStatus('Error');
            throw error;
        }
    }

    initializeUI() {
        // Création du conteneur principal
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('Container not found:', this.containerId);
            return;
        }

        container.innerHTML = `
            <div class="runpod-status">
                <h3>RunPod Status</h3>
                <div class="status-indicator ${this.status.toLowerCase()}">
                    <span class="status-dot"></span>
                    <span class="status-text">${this.status}</span>
                </div>
                <div class="runpod-info">
                    <p>Temps d'utilisation: <span id="runtime">0:00</span></p>
                    <p>Coût estimé: <span id="cost">$0.00</span></p>
                    <div class="usage-progress">
                        <div class="progress-label">
                            <span>Utilisation : </span>
                            <span id="usage-percent">0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="progress-details">
                            <span id="usage-current">$0.00</span> / <span id="usage-limit">$25.00</span>
                        </div>
                    </div>
                </div>
                <button id="runpod-toggle" class="toggle-btn">Démarrer</button>
            </div>
        `;

        // Ajout des styles
        if (!document.getElementById('runpod-styles')) {
            const styles = document.createElement('style');
            styles.id = 'runpod-styles';
            styles.textContent = `
                .runpod-status {
                    background: #f5f5f5;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .status-indicator {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                }
                .status-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    margin-right: 8px;
                }
                .ready .status-dot { background: #4CAF50; }
                .starting .status-dot { background: #FFC107; }
                .stopped .status-dot { background: #9E9E9E; }
                .error .status-dot { background: #F44336; }
                .toggle-btn {
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                    font-size: 14px;
                }
                .toggle-btn.stop {
                    background: #F44336;
                }
                .runpod-info {
                    margin: 15px 0;
                    font-size: 14px;
                }
                /* Styles pour la barre de progression */
                .usage-progress {
                    margin-top: 15px;
                    padding: 10px;
                    background: #fff;
                    border-radius: 4px;
                }

                .progress-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    font-size: 14px;
                }

                .progress-bar {
                    height: 10px;
                    background: #e0e0e0;
                    border-radius: 5px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4CAF50 0%, #FFC107 70%, #F44336 100%);
                    width: 0%;
                    transition: width 0.3s ease;
                }

                .progress-details {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    font-size: 12px;
                    color: #666;
                }

                /* Couleurs selon le pourcentage */
                .progress-fill.safe { background: #4CAF50; }
                .progress-fill.warning { background: #FFC107; }
                .progress-fill.danger { background: #F44336; }
            `;
            document.head.appendChild(styles);
        }

        // Gestion des événements
        this.toggleButton = document.getElementById('runpod-toggle');
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleRunPod());
        }

        // Mise à jour périodique
        setInterval(() => this.updateInfo(), 1000);
    }

    async toggleRunPod() {
        try {
            if (this.status === 'Stopped' || this.status === 'Error') {
                await this.startRunPod();
            } else {
                await this.stopRunPod();
            }
        } catch (error) {
            window.addLog(`Erreur lors du basculement de RunPod: ${error.message}`);
        }
    }

    async startRunPod() {
        try {
            this.setStatus('Starting');
            await this.makeRequest(`https://api.runpod.ai/v2/endpoint/${this.endpointId}/start`, 'POST');
            window.addLog('RunPod démarré avec succès', 'success');
        } catch (error) {
            window.addLog('Erreur lors du démarrage de RunPod', 'error');
            this.setStatus('Error');
        }
    }

    async stopRunPod() {
        try {
            this.setStatus('Stopping');
            await this.makeRequest(`https://api.runpod.ai/v2/endpoint/${this.endpointId}/stop`, 'POST');
            window.addLog('RunPod arrêté avec succès', 'success');
            this.setStatus('Stopped');
        } catch (error) {
            window.addLog('Erreur lors de l\'arrêt de RunPod', 'error');
            this.setStatus('Error');
        }
    }

    async checkInitialStatus() {
        try {
            const data = await this.makeRequest(`https://api.runpod.ai/v2/endpoint/${this.endpointId}/status`);
            this.updateStatus(data.status);
            if (data.status === 'Ready') {
                this.startTime = new Date(data.startedAt);
                this.toggleButton.textContent = 'Arrêter';
                this.toggleButton.classList.add('stop');
            }
        } catch (error) {
            this.setStatus('Error');
        }
    }

    async checkStatus() {
        try {
            const data = await this.makeRequest(`https://api.runpod.ai/v2/endpoint/${this.endpointId}/status`);
            this.updateStatus(data.status);
        } catch (error) {
            // L'erreur est déjà gérée dans makeRequest
        }
    }

    updateStatus(status) {
        this.setStatus(status);
        if (status === 'Ready' && !this.startTime) {
            this.startTime = new Date();
            this.toggleButton.textContent = 'Arrêter';
            this.toggleButton.classList.add('stop');
        } else if (status !== 'Ready') {
            this.startTime = null;
            this.toggleButton.textContent = 'Démarrer';
            this.toggleButton.classList.remove('stop');
        }
    }

    setStatus(status) {
        this.status = status;
        const indicator = document.querySelector('.status-indicator');
        if (indicator) {
            indicator.className = `status-indicator ${status.toLowerCase()}`;
            const statusText = indicator.querySelector('.status-text');
            if (statusText) {
                statusText.textContent = status;
            }
            // Mettre à jour la couleur du point selon le statut
            const statusDot = indicator.querySelector('.status-dot');
            if (statusDot) {
                const colors = {
                    'Ready': '#4CAF50',
                    'Starting': '#FFC107',
                    'Stopping': '#FF9800',
                    'Stopped': '#9E9E9E',
                    'Error': '#F44336',
                    'Checking...': '#2196F3'
                };
                statusDot.style.backgroundColor = colors[status] || colors['Error'];
            }
        }
    }

    updateInfo() {
        if (this.startTime) {
            const now = new Date();
            const runtime = Math.floor((now - this.startTime) / 1000);
            const minutes = Math.floor(runtime / 60);
            const seconds = runtime % 60;
            
            const runtimeElement = document.getElementById('runtime');
            if (runtimeElement) {
                runtimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            // Calcul du coût
            const hours = runtime / 3600;
            this.cost = hours * (window.runpodConfig?.hourlyRate || 0);
            
            const costElement = document.getElementById('cost');
            if (costElement) {
                costElement.textContent = `$${this.cost.toFixed(4)}`;
            }

            // Mise à jour de la barre de progression
            this.updateUsageProgress(this.cost);
        }
    }

    updateUsageProgress(currentCost) {
        const usageLimit = 25.00; // Limite de $25
        const percentage = (currentCost / usageLimit) * 100;
        
        // Mise à jour du pourcentage
        const percentElement = document.getElementById('usage-percent');
        if (percentElement) {
            percentElement.textContent = `${percentage.toFixed(1)}%`;
        }

        // Mise à jour de la barre de progression
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${Math.min(percentage, 100)}%`;
            
            // Mise à jour de la classe selon le pourcentage
            progressFill.className = 'progress-fill ' + 
                (percentage < 50 ? 'safe' : 
                 percentage < 80 ? 'warning' : 
                 'danger');
        }

        // Mise à jour des valeurs
        const currentElement = document.getElementById('usage-current');
        if (currentElement) {
            currentElement.textContent = `$${currentCost.toFixed(2)}`;
        }

        const limitElement = document.getElementById('usage-limit');
        if (limitElement) {
            limitElement.textContent = `$${usageLimit.toFixed(2)}`;
        }
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RunPodControl;
} else {
    window.RunPodControl = RunPodControl;
} 