@echo off
cd /d "%~dp0"
echo === Git 초기화 중... ===
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/psmpsm456/Tokyo.git
echo === GitHub에 push 중... ===
git push -u origin main
echo.
echo === 완료! 창을 닫으려면 아무 키나 누르세요. ===
pause
