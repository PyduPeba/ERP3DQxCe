# Projeto de Dashboards e Analíticos - Módulo de Suporte

Este documento detalha o funcionamento e a arquitetura do novo sistema de gráficos do módulo de suporte.

## 📊 Visão Geral
O objetivo é transformar os dados brutos de chamados, ordens de serviço e contratos de locação em informações visuais que facilitem a tomada de decisão e a auditoria para faturamento.

## 🛠️ Tecnologias
- **Recharts**: Biblioteca de gráficos baseada em React para visualizações leves e responsivas.
- **Prisma Aggregations**: Uso de funções de agrupamento (`groupBy`, `_count`, `_sum`) para eficiência de performance.

## 📈 Gráficos Planejados

### 1. Volume de Atendimentos (Barras)
- **O que mostra**: Quantidade de Chamados e OS abertas por mês/semana.
- **Utilidade**: Identificar picos de demanda e necessidade de mais técnicos.

### 2. Composição de Faturamento (Linha/Área)
- **O que mostra**: Comparativo entre Faturamento Recorrente (Locações) vs Atendimentos Avulsos.
- **Utilidade**: Previsibilidade financeira.

### 3. Distribuição por Status (Pizza)
- **O que mostra**: Percentual de Chamados Resolvidos vs Pendentes.
- **Utilidade**: Monitoramento de gargalos operacionais.

## ⚙️ Fluxo de Dados
1. O frontend faz uma chamada unificada para `/api/suporte/stats`.
2. A API recebe parâmetros de filtro (`periodo`, `clienteId`, `categoria`).
3. A API executa múltiplas consultas paralelas no banco de dados, aplicando os filtros dinamicamente.
4. Os dados são formatados em JSON compatível com os tipos do `recharts`.
5. O Dashboard atualiza em tempo real sem a necessidade de recarregar a página.

## 🎛️ Filtros Inteligentes
- **Abas de Período**: Seleção rápida de 7, 30, 90 dias ou o ano corrente.
- **Filtro Transversal**: Ao selecionar um cliente, todo o dashboard (volume, faturamento e métricas) é filtrado instantaneamente para aquele cliente.
- **Comparativo**: Exibição de indicadores de crescimento (setas verde/vermelha) em relação ao período anterior.

---
> [!TIP]
> Os gráficos serão interativos, permitindo passar o mouse para ver detalhes específicos de cada ponto de dados.
