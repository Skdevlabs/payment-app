export interface QuoteResponseData {
    status: string;
    acceptanceExpiryDate: string;
    merchantDisplayName: string;
    reference: string;  
    paidCurrency: {
        amount: number;
        currency: string;
     }
}

export interface QuoteResponseForCoinData {
    acceptanceExpiryDate: string;
    paidCurrency: {
        amount: number;
        currency: string;
     }
}

export interface AcceptQuoteResponseData {
    paidCurrency: {
        amount: number; 
        currency: string;
    };
    address: {address:string;}
    expiryDate: string;
}
    