// Types for Suporte module

export type Chamado = {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
    status: 'aberto' | 'em_andamento' | 'resolvido' | 'fechado';
    cliente?: string;
    tecnico?: string;
    createdAt: string;
    updatedAt: string;
    ordensServico?: OrdemServico[];
};

export type OrdemServico = {
    id: number;
    numero: string;
    chamadoId?: number;
    cliente?: string;
    descricao: string;
    status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';
    valorMaoObra?: number;
    observacoes?: string;
    createdAt: string;
    updatedAt: string;
    chamado?: Chamado;
    itensUsados?: ItemOS[];
};

export type ItemOS = {
    id: number;
    osId: number;
    itemEstoqueId: number;
    quantidade: number;
    valorUnitario?: number;
    os?: OrdemServico;
    item?: ItemEstoque;
};

export type ItemEstoque = {
    id: number;
    codigo?: string;
    nome: string;
    descricao?: string;
    categoria?: string;
    quantidade: number;
    minimo: number;
    valorUnit?: number;
    fornecedor?: string;
    localizacao?: string;
    createdAt: string;
    updatedAt: string;
    itensOS?: ItemOS[];
};

export type Locacao = {
    id: number;
    equipamento: string;
    descricao?: string;
    cliente?: string;
    dataInicio: string;
    dataFim: string;
    valorMensal: number;
    valorTotal?: number;
    status: 'ativo' | 'vencido' | 'finalizado' | 'cancelado';
    observacoes?: string;
    createdAt: string;
    updatedAt: string;
};

export type SuporteStats = {
    chamadosAbertos: number;
    osAndamento: number;
    itensEstoque: number;
    locacoesAtivas: number;
    itensEstoqueBaixo: number;
};
