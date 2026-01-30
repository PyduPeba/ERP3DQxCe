# Guia de Instalação e Preparação - Produção (ERP3DQxCe)

> [!CAUTION]
> **REINICIALIZAÇÃO DO SERVIDOR**: Este guia assume que o servidor foi formatado.
> Se você utiliza uma porta SSH customizada (ex: `22022`), **NUNCA** ative o firewall sem liberar essa porta primeiro.

## 1. Preparação e Firewall (VITAL)

Antes de qualquer instalação, garanta que suas portas de acesso estão liberadas no SO:

```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar firewall (se não houver) e liberar portas críticas
sudo apt install -y ufw
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22022/tcp  # <--- SUA PORTA SSH CUSTOMIZADA
sudo ufw enable
```

## 2. Instalação e Segurança do aaPanel

O **aaPanel** será sua rede de segurança. Se o SSH falhar, você ainda terá controle total via web.

### 2.1 Instalação

```bash
# O instalador do aaPanel perguntará se você deseja ativar o SSL do painel (Lest Encrypt). 
# Responda 'y' para segurança máxima.
URL=https://www.aapanel.com/script/install_7.0_en.sh && if [ -f /usr/bin/curl ];then curl -sSO $URL;else wget -O install_7.0_en.sh $URL;fi;bash install_7.0_en.sh aapanel
```

> [!IMPORTANT]
> **ANOTE AS INFORMAÇÕES FINAIS**: Ao terminar, o terminal exibirá:
> - `Internet Address`: (Ex: http://MEUIP:8888/login_path)
> - `Username` e `Password`
> - **Porta do Painel**: Geralmente `8888` (ou uma aleatória gerada).

### 2.2 Liberar Porta do Painel no Sistema

Se o seu acesso SSH cair agora, é porque o firewall do SO bloqueou a porta do painel. **Libere-a imediatamente**:

```bash
# Se o painel estiver na porta 8888 (verifique no Log de instalação)
sudo ufw allow 8888/tcp
sudo ufw reload
```

### 2.3 Configurações de Segurança no Painel

Assim que logar no aaPanel pela primeira vez:

1.  **Mudar Caminho de Login**: Vá em `Settings` > `Security entrance`. Mude para algo secreto (ex: `/meu_painel_seguro`).
2.  **Mudar Porta Padrão**: Mude a porta `8888` para uma customizada (ex: `45678`). *Não esqueça de liberar essa nova porta no `ufw` antes de salvar.*
3.  **Vincular Domínio**: Se possível, vincule o painel a um subdomínio (ex: `painel.suportesolution.app.br`) e ative o SSL para o painel em `Settings` > `Panel SSL`.
4.  **Instalar dependências**: No prompt inicial (vapt-vapt), instale:
    - `Nginx 1.22+`
    - `MySQL 8.0` ou `PostgreSQL 15`
    - `PHP 8.1+` (opcional, necessário apenas para o aaPanel rodar certas ferramentas)
    - `Node.js Version Manager` (na App Store)

## 3. Instalação do Node.js (v20+)

Via aaPanel (Node.js Manager) ou via terminal:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## 4. Preparação do Projeto

```bash
# Clonar o repositório
git clone https://github.com/PyduPeba/ERP3DQxCe.git ~/erp-web
cd ~/erp-web

# Mudar para a branch de desenvolvimento
git checkout feature/mvp-suporte-os-estoque-locacao

# Instalar dependências
npm install
```

## 5. Configuração do Banco de Dados

Crie o banco através do aaPanel (Database) ou via Docker:
```bash
# Se usar Docker (opcional se usar o banco do aaPanel)
sudo apt install -y docker-compose
sudo systemctl enable docker  # <--- Garante que o Docker inicie no boot

# Subir os containers (garanta que seu docker-compose.yml tenha 'restart: always')
sudo docker compose up -d
```

Configure o `.env`:
```env
DATABASE_URL="postgresql://admin:password123456!@localhost:5433/erp_db?schema=public"
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="https://suportesolution.app.br"
```

Execute as migrations:
```bash
npx prisma migrate deploy
```

## 6. Build e Execução

```bash
# Gerar build
npm run build

# Iniciar com PM2
pm2 start npm --name "erp-web" -- start
pm2 save
pm2 startup
```

## 7. Configuração do Servidor Web (Nginx)

Escolha **uma** das opções abaixo para configurar o acesso externo ao ERP:

### Opção A: Via aaPanel (Recomendado - GUI)

1. No aaPanel, vá em **Website** > **Add site**.
2. Digite seu domínio: `suportesolution.app.br`.
3. Após criar, clique no nome do site e vá em **Reverse Proxy** > **Add reverse proxy**:
   - Proxy Name: `erp`
   - Target URL: `http://127.0.0.1:3000`
4. Vá na aba **SSL** do site, use o Let's Encrypt para gerar o certificado e ative o "Force HTTPS".

### Opção B: Via Terminal (Manual)

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

Para SSL manual:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d suportesolution.app.br
```

---
*Este guia foi atualizado para incluir redundância de acesso e evitar travamentos por firewall.*
