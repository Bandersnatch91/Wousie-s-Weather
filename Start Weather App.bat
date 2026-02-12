@echo off
title Weather App
cd /d "%~dp0"
start http://localhost:5173
call npm run dev
