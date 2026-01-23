// Utility functions for Suporte module integrations

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('pt-BR');
};

export const formatDateTime = (date: string | Date): string => {
    return new Date(date).toLocaleString('pt-BR');
};

export const getPrioridadeColor = (prioridade: string) => {
    const colors = {
        baixa: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
        media: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
        alta: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
        urgente: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
    };
    return colors[prioridade as keyof typeof colors] || colors.media;
};

export const getStatusColor = (status: string, type: 'chamado' | 'os' | 'locacao' = 'chamado') => {
    if (type === 'chamado') {
        const colors = {
            aberto: { bg: 'bg-blue-100', text: 'text-blue-700' },
            em_andamento: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
            resolvido: { bg: 'bg-green-100', text: 'text-green-700' },
            fechado: { bg: 'bg-gray-100', text: 'text-gray-700' },
        };
        return colors[status as keyof typeof colors] || colors.aberto;
    }

    if (type === 'os') {
        const colors = {
            pendente: { bg: 'bg-gray-100', text: 'text-gray-700' },
            em_andamento: { bg: 'bg-blue-100', text: 'text-blue-700' },
            concluido: { bg: 'bg-green-100', text: 'text-green-700' },
            cancelado: { bg: 'bg-red-100', text: 'text-red-700' },
        };
        return colors[status as keyof typeof colors] || colors.pendente;
    }

    if (type === 'locacao') {
        const colors = {
            ativo: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
            vencido: { bg: 'bg-red-100', text: 'text-red-700' },
            finalizado: { bg: 'bg-gray-100', text: 'text-gray-700' },
            cancelado: { bg: 'bg-orange-100', text: 'text-orange-700' },
        };
        return colors[status as keyof typeof colors] || colors.ativo;
    }

    return { bg: 'bg-gray-100', text: 'text-gray-700' };
};

export const calcularDiasRestantes = (dataFim: string | Date): number => {
    const diff = new Date(dataFim).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isEstoqueBaixo = (quantidade: number, minimo: number): boolean => {
    return quantidade <= minimo;
};

export const gerarNumeroOS = (count: number): string => {
    return `OS-${String(count + 1).padStart(6, '0')}`;
};
