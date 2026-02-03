#!/bin/bash
# Script de verificação e correção para o Editor Visual

echo "🔍 Verificando instalação do Editor Visual..."

# 1. Verificar se as dependências estão instaladas
echo ""
echo "1️⃣ Verificando dependências npm..."
if npm list @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities nanoid &> /dev/null; then
    echo "✅ Dependências instaladas"
else
    echo "❌ Dependências faltando - instalando..."
    npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities nanoid
fi

# 2. Verificar Prisma Client
echo ""
echo "2️⃣ Gerando Prisma Client..."
npx prisma generate

# 3. Verificar banco de dados
echo ""
echo "3️⃣ Atualizando banco de dados..."
npx prisma db push

# 4. Verificar se o arquivo do editor existe
echo ""
echo "4️⃣ Verificando arquivos do editor..."
if [ -f "src/app/suporte/relatorios/templates/editor/page.tsx" ]; then
    echo "✅ Página do editor existe"
else
    echo "❌ Página do editor não encontrada!"
fi

# 5. Build da aplicação
echo ""
echo "5️⃣ Fazendo build..."
npm run build

# 6. Reiniciar PM2
echo ""
echo "6️⃣ Reiniciando aplicação..."
pm2 restart erp-web

echo ""
echo "✅ Verificação completa!"
echo ""
echo "📝 Próximos passos:"
echo "1. Acesse o site e faça HARD REFRESH (Ctrl+Shift+R)"
echo "2. Vá em Suporte → Relatórios → Templates"
echo "3. Procure o botão roxo 'Editor Visual'"
echo ""
echo "Se ainda não aparecer, verifique o console do navegador (F12) para erros"
