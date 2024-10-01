export interface ClientDataType {
    empresa: {
        tipo: string;
        nomeRazaoSocial: string;
        documento: string;
        apelido: string;
        inscricaoMunicipal: string;
        inscricaoEstadual: string;
        suframa: string;
        ramoAtividade: string;
        siteWeb: string;
        numeroFuncionarios: number;
    };
    endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
    contatos: {
        nome: string;
        email: string;
        cargo: string;
        telefone: string;
    };
}
