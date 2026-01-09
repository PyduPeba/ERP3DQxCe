# Arquitetura do Estúdio 3D - Letra Caixa

Esta ferramenta utiliza um **Motor 3D Híbrido** projetado para oferecer a melhor experiência de usuário (UX) sem comprometer a precisão industrial necessária para impressão 3D (Manifold).

## Tecnologias Utilizadas

### 1. Frontend: Three.js + STLLoader
- **Draft Mode (Visualização Rápida)**: Utiliza geometrias simples do Three.js (`TextGeometry`) para renderização instantânea enquanto os parâmetros são ajustados.
- **Visualização de STL**: O `STLLoader` é usado para carregar e exibir o modelo final gerado pelo motor industrial.
- **Processamento Individual**: As letras são processadas uma a uma no preview para permitir o controle dinâmico de espaçamento ("Espaço Chars").

### 2. Backend: OpenSCAD CLI
- **Motor de Precisão**: Ao contrário de bibliotecas de CSG para browser, o OpenSCAD utiliza operações booleanas matematicamente precisas.
- **Scripts Paramétricos**: O backend gera dinamicamente um arquivo `.scad` baseado nos inputs do usuário e o compila em um STL industrial.
- **Hollowing (Oco)**: Implementa uma lógica de `offset()` negativo sobre a união de todas as letras, garantindo que o interior seja contínuo (sem paredes internas entre letras conectadas).

### 3. Otimização e Performance
- **MD5 Caching**: Cada conjunto de parâmetros gera um hash MD5 único. O servidor armazena os STLs gerados em `stl-cache/`. Se os mesmos parâmetros forem solicitados, o arquivo é servido instantaneamente.
- **Semáforo de Concorrência**: Limita o número de execuções simultâneas do OpenSCAD para proteger a CPU do servidor sob alta carga.
- **Cache de Memória (Frontend)**: O rascunho preparado é mantido em memória para evitar requisições desnecessárias ao servidor se nada foi alterado.

## Requisitos de Sistema
- **OpenSCAD**: Deve estar instalado no servidor no caminho configurado (padrão: `C:\Program Files\OpenSCAD\openscad.exe`).
- **Fontes**: Utilização da fonte `Liberation Sans` (nativa do OpenSCAD) para garantir compatibilidade total na geração.
