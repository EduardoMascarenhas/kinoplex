export type ConviteEletronico = {
    id: number;
    descricao: string;
    validade?: Date;
    quantidade?: any;
    preco_unitario?: number;
    status?: string;
    tipo?: string;
};
export type ConviteImpresso = {
    id: number;
    descricao: string;
    quantidade?: any;
    preco_unitario?: number;
    lote?: string,
    serie?: string,
    numeracao?: string,
    disponibilidade?: number,
    status?: string;
    tipo?: string;
};

export type ConviteItems = {
    id?: number;
    quantia?: number;
    descricao?: string;
    quantidade?: number;
    preco_unitario?: number;
    lote?: string,
    serie?: string,
    numeracao?: string,
    disponibilidade?: number,
    tipo?: string,
    total?: number;
};

export type ConviteQuantia = {
    valorDescontoAplicado: number;
    valorTaxaAplicada: number;
    valorDesconto: number;
    subTotal: number;
    quantiaImpostos: number;
    quantiaTotal: number;
};

export type AddConvite = {
    quantia?: number;
    convite?: string;
    total?: number;
    preco_unitario?: number;
    descricao?: string;
    quantidade?: number;
    valor?: any;
    quantiaTotal?: number;
    lote?: string,
    serie?: string,
    numeracao?: string,
    disponibilidade?: number,
    tipo?: string,
    rate?: any;
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
    totalAmount?: number;
};
