# --- Configuration ---
Write-Host "🚀 Starting Build..." -ForegroundColor Cyan

# 1. Clear old build and cache to ensure a fresh start
if (Test-Path -Path "build") { Remove-Item -Recurse -Force build }
if (Test-Path -Path ".docusaurus") { Remove-Item -Recurse -Force .docusaurus }

# 2. Run the build with expanded memory=
# We call the docusaurus binary directly through node to apply the memory flag
# Set memory to 20GB and enable the performance logger
$env:NODE_OPTIONS = "--max-old-space-size=16000"
$env:DOCUSAURUS_PERF_LOGGER = "false"

npm run build