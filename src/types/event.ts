export interface EventDataType {
    id: string;
    createdAt: string;
    empresa: {
        cnpj: string;
        nomeFantasia: string;
        banco: string;
        agencia: string;
        conta: string;
    };
    dataELocalizacao: {
        dia: string;
        complexo: string;
        convidados: number;
    };
    dadosDoEvento: {
        nEvento: string;
        status: string;
        tipoEvento: string;
        nomeEvento: string;
        cliente: string;
        nomeDoContato: string;
        emailDoContato: string;
        telefoneDoContato: string;
        responsavel: string;
        descricaoEvento: string;
    };
    pacote: [
        {
            id: number;
            tipo: string;
            item: string;
            quantidade: number;
            valorUnitario: number;
            valorTotal: number;
        }
    ];
    infoAdministrativas: {
        dataVencimento: string;
        dataPagamento: string;
        formaDePagamento: string;
        informacoes: string;
        observacaoNoBoleto: string;
    };
    boletos: [
        {
            nBoleto: string;
            pagador: string;
            beneficiario: string;
            valorPago: number;
            status: string;
        }
    ];
    observacoesGerais: [
        {
            id: string;
            createdAt: string;
            updatedAt: string;
            observacao: string;
            titulo: string;
        }
    ];
    historicoComentarios: [
        {
            id: string;
            createdAt: string;
            updatedAt: string;
            comentario: string;
            userName: string;
        }
    ];
}
