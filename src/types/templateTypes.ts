// Types for Visual Template Editor

export type BlockType = 'header' | 'info' | 'table' | 'text' | 'image' | 'signature' | 'spacer';

export interface BlockStyle {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
    borderWidth?: string;
    borderColor?: string;
}

export interface TemplateBlock {
    id: string;
    type: BlockType;
    order: number;
    config: {
        // Common
        content?: string;
        style?: BlockStyle;

        // Header specific
        title?: string;
        subtitle?: string;
        showLogo?: boolean;

        // Info specific
        fields?: string[]; // e.g., ['prestador.nomeEmpresa', 'cliente.nome']
        columns?: number;

        // Table specific
        showPhotos?: boolean;
        showEquipment?: boolean;
        showTombo?: boolean;

        // Image specific
        layout?: 'grid' | 'list';
        imagesPerRow?: number;

        // Spacer specific
        height?: string;
    };
}

export interface TemplateConfig {
    pageSize: 'A4' | 'Letter';
    margins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    orientation: 'portrait' | 'landscape';
    showPageNumbers?: boolean;
}

export interface VisualTemplate {
    id?: number;
    nome: string;
    categoria: string;
    blocos: TemplateBlock[];
    configuracaoGeral: TemplateConfig;
}

// Available dynamic fields
export const AVAILABLE_FIELDS = {
    prestador: [
        { key: 'nomeEmpresa', label: 'Nome da Empresa' },
        { key: 'cnpj', label: 'CNPJ' },
        { key: 'contato', label: 'Contato' }
    ],
    cliente: [
        { key: 'nome', label: 'Nome' },
        { key: 'cpfCnpj', label: 'CPF/CNPJ' },
        { key: 'logradouro', label: 'Logradouro' },
        { key: 'numero', label: 'Número' },
        { key: 'bairro', label: 'Bairro' },
        { key: 'cidade', label: 'Cidade' },
        { key: 'estado', label: 'Estado' }
    ],
    relatorio: [
        { key: 'numero', label: 'Número do Relatório' },
        { key: 'mesReferencia', label: 'Mês de Referência' },
        { key: 'anoReferencia', label: 'Ano de Referência' },
        { key: 'dataGeracao', label: 'Data de Geração' }
    ]
};

// Block type definitions
export const BLOCK_TYPES = [
    {
        type: 'header' as BlockType,
        label: 'Cabeçalho',
        icon: '📄',
        description: 'Título e subtítulo do relatório'
    },
    {
        type: 'info' as BlockType,
        label: 'Informações',
        icon: '📋',
        description: 'Dados do prestador e cliente'
    },
    {
        type: 'table' as BlockType,
        label: 'Tabela de Itens',
        icon: '📊',
        description: 'Lista de serviços realizados'
    },
    {
        type: 'text' as BlockType,
        label: 'Texto Livre',
        icon: '📝',
        description: 'Observações e notas'
    },
    {
        type: 'image' as BlockType,
        label: 'Anexo Fotográfico',
        icon: '📷',
        description: 'Galeria de fotos'
    },
    {
        type: 'signature' as BlockType,
        label: 'Assinaturas',
        icon: '✍️',
        description: 'Campos para assinatura'
    },
    {
        type: 'spacer' as BlockType,
        label: 'Espaçador',
        icon: '⬇️',
        description: 'Espaço em branco'
    }
];
