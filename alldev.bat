@echo off
echo --- All development servers will be running ---
start "Frontend" cmd /k "cd Frontend && npm run dev"
start "Backend" cmd /k "cd Backend && npm run dev"