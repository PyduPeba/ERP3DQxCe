#!/bin/bash

# Script de parada do sistema ERP na VPS
# Este script para todos os serviços de forma ordenada

echo "🛑 Parando Sistema ERP..."
echo "================================"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Parar aplicação Next.js
echo ""
echo "⚡ Parando aplicação Next.js..."
if command -v pm2 >/dev/null 2>&1; then
    pm2 stop erp-web
    echo -e "${GREEN}✓${NC} Aplicação Next.js parada"
else
    echo -e "${YELLOW}⚠${NC} PM2 não encontrado"
fi

# 2. Parar PostgreSQL (via Docker)
echo ""
echo "🐘 Parando PostgreSQL..."
cd /root/erp-web
if [ -f "docker-compose.yml" ]; then
    docker-compose down
    echo -e "${GREEN}✓${NC} PostgreSQL parado"
else
    POSTGRES_CONTAINER=$(docker ps -a --filter "name=postgres" --format "{{.Names}}" | head -n 1)
    if [ -n "$POSTGRES_CONTAINER" ]; then
        docker stop $POSTGRES_CONTAINER
        echo -e "${GREEN}✓${NC} PostgreSQL parado (container: $POSTGRES_CONTAINER)"
    fi
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ Sistema parado!${NC}"
echo "================================"
