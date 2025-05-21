@echo off
title Iniciando sistema Verde em Vários Tons

start cmd /k "cd backend && node server.js"
timeout /t 2 >nul
start cmd /k "cd frontend/frontend && npm start"
