#!/bin/bash
cd "$(dirname "$0")"
git config --global user.email "psmpsm613@gmail.com"
git config --global user.name "psmpsm456"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/psmpsm456/Tokyo.git
git push -u origin main
echo ""
echo "=== 완료! ==="
read -p "아무 키나 누르면 닫힙니다..."
