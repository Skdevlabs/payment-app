export interface QuoteResponseData {
    uuid: string;
    currency: string;
    amount: number;
    payInMethod: string;
    payOutMethod: string;
    payOutAmount: number;
    payOutCurrency: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    acceptanceExpiryDate: string;
    successUrl: string;
    errorUrl: string;
    callbackUrl: string;
    merchantDisplayName: string;
    metadata: string;
    quoteId: string;
    paidCurrency: {
        amount: number;
        currency: string;
     }
    payInAddress: string;
    payInAmount: number;
    payInCurrency: string;
    payInTxHash: string;
    payInTxTimestamp: string;
    payInTxConfirmations: number;
    payInTxStatus: string;
    payInTxError: string;
    payInTxMetadata: string;
    payOutAddress: string;
    payOutTxHash: string;
    payOutTxTimestamp: string;
    payOutTxConfirmations: number;
    payOutTxStatus: string;
    payOutTxError: string;
    payOutTxMetadata: string;
    address: string;  
    reference: string;  
    
}

export interface AcceptQuoteResponseData {
    paidCurrency: {
        amount: number; 
        currency: string;
    };
    address: {address:string;}
    expiryDate: string;
}
    