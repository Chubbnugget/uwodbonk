# --- Configuration ---
$MemoryLimit = 24576  # 16GB of RAM for Node
$ProjectName = "uwodbonk" # Change this to your Cloudflare project name

Write-Host "🚀 Starting Build..." -ForegroundColor Cyan

# 1. Clear old build and cache to ensure a fresh start
if (Test-Path -Path "build") { Remove-Item -Recurse -Force build }
if (Test-Path -Path ".docusaurus") { Remove-Item -Recurse -Force .docusaurus }

# 2. Run the build with expanded memory=
# We call the docusaurus binary directly through node to apply the memory flag
$env:NODE_OPTIONS = "--max-old-space-size=$MemoryLimit"
npx docusaurus build