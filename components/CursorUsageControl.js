class CursorUsageControl {
    constructor(containerId = 'cursor-control-container') {
        this.containerId = containerId;
        this.usageLimit = 40000; // Limite de tokens pour Cursor
        this.currentUsage = 0;
        this.initializeUI();
        this.updateCurrentUsage();
    }

    initializeUI() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('Container not found:', this.containerId);
            return;
        }

        container.innerHTML = `
            <div class="cursor-usage">
                <div class="usage-info">
                    <div class="usage-progress">
                        <div class="progress-label">
                            <span>Utilisation : </span>
                            <span id="cursor-usage-percent">0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="progress-details">
                            <span id="cursor-usage-current">0</span> / <span id="cursor-usage-limit">${this.usageLimit}</span> tokens
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Ajout des styles spécifiques à Cursor
        if (!document.getElementById('cursor-styles')) {
            const styles = document.createElement('style');
            styles.id = 'cursor-styles';
            styles.textContent = `
                .cursor-usage {
                    background: #1e1e1e;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    color: #ffffff;
                }

                .usage-info {
                    margin: 15px 0;
                }

                .usage-progress {
                    margin-top: 15px;
                    padding: 10px;
                    background: #2d2d2d;
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
                    background: #3d3d3d;
                    border-radius: 5px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    width: 0%;
                    transition: width 0.3s ease;
                }

                .progress-details {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    font-size: 12px;
                    color: #888;
                }

                /* États de la barre de progression */
                .progress-fill.safe { background: #4CAF50; }
                .progress-fill.warning { background: #FFC107; }
                .progress-fill.danger { background: #F44336; }
            `;
            document.head.appendChild(styles);
        }
    }

    updateUsageProgress(currentUsage) {
        this.currentUsage = currentUsage;
        const percentage = (currentUsage / this.usageLimit) * 100;
        
        // Mise à jour du pourcentage
        const percentElement = document.getElementById('cursor-usage-percent');
        if (percentElement) {
            percentElement.textContent = `${percentage.toFixed(1)}%`;
        }

        // Mise à jour de la barre de progression
        const progressFill = document.querySelector('.cursor-usage .progress-fill');
        if (progressFill) {
            progressFill.style.width = `${Math.min(percentage, 100)}%`;
            
            // Mise à jour de la classe selon le pourcentage
            progressFill.className = 'progress-fill ' + 
                (percentage < 50 ? 'safe' : 
                 percentage < 80 ? 'warning' : 
                 'danger');
        }

        // Mise à jour des valeurs
        const currentElement = document.getElementById('cursor-usage-current');
        if (currentElement) {
            currentElement.textContent = currentUsage.toFixed(0);
        }
    }

    updateCurrentUsage() {
        // Utilisation actuelle (à remplacer par l'API réelle de Cursor)
        const currentUsage = 176; // Valeur fixe pour le moment
        this.updateUsageProgress(currentUsage);
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CursorUsageControl;
} else {
    window.CursorUsageControl = CursorUsageControl;
} 