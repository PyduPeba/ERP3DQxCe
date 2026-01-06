# 🛠️ Guia: Publicando no GitHub pelo Terminal

Siga estes passos exatamente na ordem para subir seu projeto.

### 1. Criar o Repositório no GitHub
- Vá ao seu [GitHub](https://github.com/) e crie um novo repositório chamado `KeyChain`.
- **NÃO** marque a opção de adicionar README, .gitignore ou License (já criamos eles).

### 2. Comandos no Terminal (Pasta `web`)
Abra o terminal na pasta `c:\Users\USUARIO\Documents\KeyChain\web` e execute:

```bash
# Inicializa o repositório git
git init

# Adiciona todos os arquivos (o .gitignore vai filtrar o que não deve subir)
git add .

# Cria o primeiro commit
git commit -m "feat: estrutura inicial com dashboard, pedidos e prisma"

# Cria o branch principal
git branch -M main

# CONECTA AO SEU GITHUB (Substitua SEU_USUARIO pela sua conta)
git remote add origin https://github.com/SEU_USUARIO/KeyChain.git

# Envia os arquivos
git push -u origin main
```

---

### ⚠️ Notas Importantes
- Se o comando `git add .` mostrar avisos sobre "LF will be replaced by CRLF", é normal em Windows.
- O arquivo `dev.db` **não** será enviado (isso é bom, pois cada ambiente deve ter seu próprio banco).
- O arquivo `.env` **não** será enviado por segurança.
