import { Cliente } from "./cliente";

export interface Oportunidade {
    id: number;
    data_criacao: string;
    cliente: Cliente; 
    tipo: string | TipoConvite; // Pode ser "Evento" (string) ou um objeto de convites
    quantidade?: QuantidadeConvites; // Só presente quando não for "Evento"
    preco_total: string;
    status?: string;
}

export interface TipoConvite {
    convite: string[]; // Exemplo: ["Impresso", "Eletrônico"]
}

export interface QuantidadeConvites {
    impresso?: number; // Pode não estar presente
    eletronico?: number; // Pode não estar presente
}


export type OportunidadeItems = {
    id?: number;
    valor?: number;
    descricao?: string;
    produto?: TipoConvite;
    quantity?: number;
    total?: number;
};

export type OportunidadeVelores = {
    valorDescontoAplicado: number;
    ValorTributarioAplicado: number;
    valorDesconto: number;
    valorImpostos: number;
    subTotal: number;
    valorTotal: number;
};

export type adicionarsOportunidade = {
    rate: any;
    about?: string | undefined;
    brand?: string | undefined;
    categories?: string[];
    colors?: string[];
    created?: string;
    date?: string;
    description?: string;
    discount?: number;
    gender?: string;
    id?: number;
    image?: string;
    isStock?: boolean;
    name?: string;
    new?: number;
    offer?: string;
    offerPrice?: number;
    popularity?: number;
    quantity?: number;
    rating?: number;
    salePrice?: number;
    selectedQuantity?: number;
    totalValor?: number;
};
