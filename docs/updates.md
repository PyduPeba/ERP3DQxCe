# Registro de Atualizações - Estúdio 3D

Histórico de evolução da ferramenta de geração de Letras Caixa.

### v1.0 - Implementação Inicial
- Criação da interface base com Three.js.
- Uso de CSG (Constructive Solid Geometry) direto no navegador.
- *Problemas*: Geometria frequentemente "quebrada" ou não-sólida para impressão.

### v2.0 - Migração para Motor Industrial
- Substituição do CSG do navegador pelo **OpenSCAD** no backend.
- Geometria matematicamente perfeita (Manifold).
- Introdução de parâmetros técnicos: Espessura de base, tampa e bordas reais em mm.

### v2.1 - Preview Híbrido (UX Apple Level)
- Divisão em **Modo Draft** (rápido) e **Modo Produção** (industrial).
- Introdução do botão "Preparar para Impressão" para separar o design da geração pesada.
- Refinamento visual: Transparência e cores distintas para tampa (Azul) e base (Ouro).

### v2.2 - Conectividade e Oco Contínuo
- Implementação de união de letras por padrão (espaçamento negativo).
- Correção da lógica de hollowing: O interior agora é um túnel contínuo sem divisórias internas.
- Refatoração do previewer para alinhar 100% o design visual com o resultado técnico.

### v2.3 - Performance Premium
- Sistema de cache MD5 no backend.
- Cache de buffer no frontend.
- Implementação de semáforo (fila) para controle de concorrência e estabilidade do servidor.
