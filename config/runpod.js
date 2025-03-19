// Configuration RunPod
const runpodConfig = {
    apiKey: process.env.RUNPOD_API_KEY,
    endpoint: process.env.RUNPOD_ENDPOINT,
    settings: {
        gpuType: 'NVIDIA RTX A4000', // Type de GPU par défaut
        containerDisk: 20, // Taille du disque en GB
        ports: '8000/http,22/tcp', // Ports à exposer
        volumeSize: 100, // Taille du volume en GB
        framework: 'PyTorch', // Framework par défaut
    },
    security: {
        maxTokensPerRequest: 2000,
        rateLimit: {
            requests: 100,
            perMinutes: 1
        },
        allowedOrigins: ['http://localhost:3000'],
        authRequired: true
    }
};

module.exports = runpodConfig; 