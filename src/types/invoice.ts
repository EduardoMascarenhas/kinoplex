export interface Invoice {
    avatar: number;
    customer_name: string;
    date: string;
    due_date: string;
    email: string;
    invoice_id: number;
    quantity: number;
    status: string;
    discount: number;
}

export type InvoiceItems = {
    amount?: number;
    description?: string;
    id?: number;
    product?: string;
    quantity?: number;
    total?: number;
};

export type InvoiceAmount = {
    appliedDiscountValue: number;
    appliedTaxValue: number;
    discountAmount: number;
    subTotal: number;
    taxesAmount: number;
    totalAmount: number;
};

export type AddInvoice = {
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
    totalAmount?: number;
};
