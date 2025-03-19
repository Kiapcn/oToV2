const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Activation de CORS pour toutes les requêtes
app.use(cors());

// Configuration du proxy vers RunPod
app.use('/api', createProxyMiddleware({
    target: 'https://api.runpod.ai',
    changeOrigin: true,
    pathRewrite: {
        '^/api/endpoint': '/v2/endpoint', // Réécriture du chemin pour les endpoints
    },
    onProxyReq: function(proxyReq, req, res) {
        // Log de la requête
        console.log('Proxy Request:', {
            method: req.method,
            path: req.path,
            targetUrl: proxyReq.path
        });
    },
    onProxyRes: function (proxyRes, req, res) {
        // Ajout des en-têtes CORS
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

        // Log de la réponse
        console.log('Proxy Response:', {
            status: proxyRes.statusCode,
            path: req.path
        });
    },
    onError: function (err, req, res) {
        console.error('Proxy Error:', err);
        res.status(500).json({
            error: 'Proxy Error',
            message: err.message,
            details: err.stack,
            originalUrl: req.originalUrl,
            targetUrl: req.path
        });
    }
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
    console.log('Proxy configured for RunPod API');
}); 