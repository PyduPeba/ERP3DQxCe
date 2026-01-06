# 🔥 ERP 3D - Gerador de Chaveiros e Gestão

Sistema de gestão para impressão 3D, focado em pedidos de chaveiros personalizados.

## 🚀 Tecnologias

- **Framework:** [Next.js 15](https://nextjs.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** SQLite
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Estilização:** Tailwind CSS

## 📦 Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd web
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz da pasta `web` (se não existir):
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Prepare o Banco de Dados:**
   Gere o cliente do Prisma e execute as migrações:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🛠️ Estrutura do Projeto

- `src/app`: Rotas e páginas da aplicação.
- `src/app/components`: Componentes reutilizáveis (Layout, etc).
- `src/app/lib`: Configurações de bibliotecas (Prisma Client).
- `prisma`: Schema do banco de dados e migrações.

---
Desenvolvido por Kayk 🔥
