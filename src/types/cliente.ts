export type Cliente = {
    id?: number;
    razao_social?: string;
    nome_fantasia?: string;
    cnpj?: string;
    inscricao_estadual?: string;
    endereco_fiscal?: string; 
    cep?: string;
    numero?: string;
    complemento?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
    contato?: ContatoCliente[]; 
};
export type ContatoCliente = {
    id?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    cargo?: string;
};
