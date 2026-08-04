#!/bin/bash
cd "$(dirname "$0")"
git add .
git commit -m "편집 모드 추가"
git push
echo ""
echo "=== 완료! Vercel이 자동 배포를 시작합니다 ==="
read -p "아무 키나 누르면 닫힙니다..."
