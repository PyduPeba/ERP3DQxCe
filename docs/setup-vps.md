# Guia de Instalação e Preparação - Produção (ERP3DQxCe)

Este guia descreve o passo a passo para configurar o projeto **ERP3DQxCe** em uma VPS rodando Ubuntu.

## 1. Preparação do Sistema

```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar dependências básicas
sudo apt install -y curl git build-essential
```

## 2. Instalação do Docker (Para o Banco de Dados)

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Adicionar seu usuário ao grupo docker
sudo usermod -aG docker $USER
# (Opcional: Saia e entre novamente no SSH para aplicar a permissão)
```

## 3. Instalação do Node.js (v20+)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 4. Instalar PM2 (Gerenciador de Processos)

```bash
sudo npm install -g pm2
```

## 5. Preparação do Projeto

```bash
# Clonar o repositório
git clone https://github.com/PyduPeba/ERP3DQxCe.git ~/erp-web
cd ~/erp-web

# Mudar para a branch específica
git checkout feature/mvp-suporte-os-estoque-locacao

# Instalar dependências
npm install
```

## 6. Configuração de Variáveis de Ambiente

Crie o arquivo `.env`:
```bash
nano .env
```
Exemplo de configuração mínima:
```env
DATABASE_URL="postgresql://admin:password123456!@localhost:5433/erp_db?schema=public"
NEXTAUTH_SECRET="seu-secret-aqui"
# Adicione outras variáveis necessárias do seu .env local
```

## 7. Banco de Dados (Docker-compose)

O projeto já possui um `docker-compose.yml` configurado para o PostgreSQL.

```bash
# Subir o banco de dados
sudo docker compose up -d
```

Execute as migrations do Prisma:
```bash
npx prisma migrate deploy
```

## 8. Build e Execução da Aplicação

```bash
# Gerar build de produção
npm run build

# Iniciar com PM2
pm2 start npm --name "erp-web" -- start

# Configurar PM2 para iniciar no boot
pm2 startup
pm2 save
```

## 9. Configuração do Nginx (Proxy Interno)

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/erp-web
```

Cole a configuração abaixo (ajuste o domínio):
```nginx
server {
    listen 80;
    server_name suportesolution.app.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative o site e reinicie o Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/erp-web /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

- [x] Fix Nginx configuration syntax and restart <!-- id: 9 -->
- [/] Start application with PM2 and configure SSL <!-- id: 10 -->

## 10. SSL com Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```
