# Scripts de Gerenciamento do Sistema ERP

Este diretório contém scripts para facilitar o gerenciamento do sistema na VPS.

## 📜 Scripts Disponíveis

### `start-system.sh`
Script de inicialização completa do sistema. Executa as seguintes verificações e ações:

1. ✅ Verifica e inicia o Docker
2. ✅ Verifica e inicia o container PostgreSQL
3. ✅ Testa conexão com banco de dados
4. ✅ Verifica e inicia a aplicação Next.js via PM2
5. ✅ Verifica se a porta 3000 está respondendo
6. ✅ Exibe resumo do status do sistema

**Como usar:**
```bash
cd /root/erp-web
chmod +x scripts/start-system.sh
./scripts/start-system.sh
```

### `stop-system.sh`
Script para parar todos os serviços de forma ordenada.

**Como usar:**
```bash
cd /root/erp-web
chmod +x scripts/stop-system.sh
./scripts/stop-system.sh
```

## 🚀 Configuração Inicial na VPS

Após fazer o `git pull`, execute:

```bash
cd /root/erp-web
chmod +x scripts/*.sh
./scripts/start-system.sh
```

## 🔄 Inicialização Automática no Boot

Para fazer o sistema iniciar automaticamente quando a VPS reiniciar:

```bash
# Criar serviço systemd
sudo nano /etc/systemd/system/erp-startup.service
```

Cole o seguinte conteúdo:

```ini
[Unit]
Description=ERP System Startup
After=network.target docker.service

[Service]
Type=oneshot
ExecStart=/root/erp-web/scripts/start-system.sh
RemainAfterExit=yes
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Depois ative o serviço:

```bash
sudo systemctl daemon-reload
sudo systemctl enable erp-startup.service
```

## 📊 Comandos Úteis

```bash
# Ver logs da aplicação
pm2 logs erp-web

# Ver logs do PostgreSQL
docker logs <container_name>

# Reiniciar apenas a aplicação
pm2 restart erp-web

# Ver status de todos os serviços
./scripts/start-system.sh

# Parar tudo
./scripts/stop-system.sh
```
