#!/bin/bash

# Script de inicialização do sistema ERP na VPS
# Este script garante que todos os serviços necessários estejam rodando

echo "🚀 Iniciando Sistema ERP..."
echo "================================"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para verificar se um comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Função para verificar status de serviço
check_service() {
    if systemctl is-active --quiet "$1"; then
        echo -e "${GREEN}✓${NC} $1 está rodando"
        return 0
    else
        echo -e "${RED}✗${NC} $1 não está rodando"
        return 1
    fi
}

# 1. Verificar e iniciar Docker
echo ""
echo "📦 Verificando Docker..."
if command_exists docker; then
    if ! check_service docker; then
        echo -e "${YELLOW}⚙${NC} Iniciando Docker..."
        sudo systemctl start docker
        sudo systemctl enable docker
        sleep 3
        check_service docker
    fi
else
    echo -e "${RED}✗${NC} Docker não está instalado!"
    exit 1
fi

# 2. Verificar e iniciar PostgreSQL (via Docker)
echo ""
echo "🐘 Verificando PostgreSQL..."
POSTGRES_CONTAINER=$(docker ps -a --filter "name=postgres" --format "{{.Names}}" | head -n 1)

if [ -z "$POSTGRES_CONTAINER" ]; then
    echo -e "${YELLOW}⚙${NC} Container PostgreSQL não encontrado. Iniciando..."
    cd /root/erp-web
    docker-compose up -d postgres
    sleep 5
else
    if [ "$(docker inspect -f '{{.State.Running}}' $POSTGRES_CONTAINER)" != "true" ]; then
        echo -e "${YELLOW}⚙${NC} Iniciando container PostgreSQL..."
        docker start $POSTGRES_CONTAINER
        sleep 5
    fi
    echo -e "${GREEN}✓${NC} PostgreSQL está rodando (container: $POSTGRES_CONTAINER)"
fi

# 3. Verificar conexão com banco de dados
echo ""
echo "🔌 Testando conexão com banco de dados..."
cd /root/erp-web
if npx prisma db execute --stdin <<< "SELECT 1;" >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Conexão com banco de dados OK"
else
    echo -e "${YELLOW}⚠${NC} Aguardando banco de dados ficar pronto..."
    sleep 10
    if npx prisma db execute --stdin <<< "SELECT 1;" >/dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Conexão com banco de dados OK"
    else
        echo -e "${RED}✗${NC} Falha ao conectar com banco de dados"
        echo "Verifique as variáveis de ambiente e o status do PostgreSQL"
    fi
fi

# 4. Verificar e iniciar aplicação Next.js via PM2
echo ""
echo "⚡ Verificando aplicação Next.js..."
if command_exists pm2; then
    PM2_STATUS=$(pm2 jlist | jq -r '.[] | select(.name=="erp-web") | .pm2_env.status' 2>/dev/null)
    
    if [ "$PM2_STATUS" = "online" ]; then
        echo -e "${GREEN}✓${NC} Aplicação Next.js está rodando"
    else
        echo -e "${YELLOW}⚙${NC} Iniciando aplicação Next.js..."
        cd /root/erp-web
        pm2 start npm --name "erp-web" -- start
        pm2 save
        sleep 3
        echo -e "${GREEN}✓${NC} Aplicação Next.js iniciada"
    fi
else
    echo -e "${RED}✗${NC} PM2 não está instalado!"
    exit 1
fi

# 5. Verificar porta 3000
echo ""
echo "🌐 Verificando porta 3000..."
if netstat -tuln | grep -q ":3000 "; then
    echo -e "${GREEN}✓${NC} Aplicação está escutando na porta 3000"
else
    echo -e "${YELLOW}⚠${NC} Porta 3000 não está em uso. Aguardando aplicação iniciar..."
    sleep 5
    if netstat -tuln | grep -q ":3000 "; then
        echo -e "${GREEN}✓${NC} Aplicação está escutando na porta 3000"
    else
        echo -e "${RED}✗${NC} Aplicação não está respondendo na porta 3000"
        echo "Verifique os logs com: pm2 logs erp-web"
    fi
fi

# 6. Resumo final
echo ""
echo "================================"
echo "📊 Status do Sistema:"
echo "================================"
check_service docker && echo "" || echo ""
docker ps --filter "name=postgres" --format "table {{.Names}}\t{{.Status}}" | grep -v "NAMES"
pm2 list | grep erp-web

echo ""
echo "================================"
echo -e "${GREEN}✅ Sistema inicializado!${NC}"
echo "================================"
echo ""
echo "📝 Comandos úteis:"
echo "  - Ver logs da aplicação: pm2 logs erp-web"
echo "  - Ver logs do PostgreSQL: docker logs <container_name>"
echo "  - Reiniciar aplicação: pm2 restart erp-web"
echo "  - Parar sistema: pm2 stop erp-web && docker-compose down"
echo ""
