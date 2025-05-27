@echo off
title Iniciando sistema Ateliê da Tia Deia

start cmd /k "cd backend && node server.js"
timeout /t 2 >nul
start cmd /k "cd frontend && npm start"
