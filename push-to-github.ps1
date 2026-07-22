# PedagogyGuard AI - GitHub Push Script
# Run this after authenticating with: gh auth login

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PedagogyGuard AI - GitHub Push" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if authenticated
Write-Host "1. Checking GitHub authentication..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($authStatus -match "Logged in") {
    Write-Host "  ✓ GitHub authenticated" -ForegroundColor Green
} else {
    Write-Host "  ✗ Not authenticated. Run: gh auth login" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2. Creating repository and pushing..." -ForegroundColor Yellow

# Create repository and push
$repoName = "pedagogyguard-ai"
$description = "The Smart-Guard Infrastructure for Entry-Level Engineers - VS Code extension that transforms AI coding assistants into active learning engines"

Write-Host "  Creating repository: $repoName" -ForegroundColor Cyan
gh repo create $repoName --public --description $description --source=. --push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Repository created and pushed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL:" -ForegroundColor Yellow
    Write-Host "  https://github.com/$(gh api user --jq '.login')/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "  1. Visit the repository URL" -ForegroundColor Cyan
    Write-Host "  2. Add topics: vscode-extension, ai, education, hackathon" -ForegroundColor Cyan
    Write-Host "  3. Create a release: gh release create v0.0.1 --title 'Initial Release'" -ForegroundColor Cyan
    Write-Host "  4. Share the link with hackathon judges!" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "ERROR: Failed to create repository" -ForegroundColor Red
    Write-Host "Check the error message above and try again" -ForegroundColor Yellow
}
