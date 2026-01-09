const { execSync } = require('child_process');
const handler = require('serve-handler');
const http = require('http');
const fs = require('fs');

const BUILD_DIR = './build';
const CACHE_DIR = './node_modules/.cache';

// 1. Build Logic
const runBuild = () => {
    console.log("⚡ Starting Build...");
    try {
        execSync('node --max-old-space-size=14000 node_modules/.bin/docusaurus build', { 
            stdio: 'inherit',
            env: { ...process.env, NODE_ENV: 'production' }
        });
        console.log("✅ Build Successful!");
    } catch (err) {
        console.error("❌ Build Failed. Check RAM usage in Cockpit.");
        process.exit(1);
    }
};

// Only build if the build folder is missing or if you want to force it
if (!fs.existsSync(BUILD_DIR)) {
    runBuild();
} else {
    console.log("♻️ Build folder exists. Skipping build to save time. (Delete 'build/' to force rebuild)");
}

// 2. Serve Logic
const server = http.createServer((request, response) => {
    return handler(request, response, {
        "public": "build",
        "cleanUrls": true,
        "rewrites": [{ "source": "**", "destination": "/index.html" }]
    });
});

const port = process.env.SERVER_PORT || 2053;
server.listen(port, () => {
    console.log(`🚀 Site live at http://localhost:${port}`);
});