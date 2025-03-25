import { atom } from "jotai"

export const selectedCurrencyAtom = atom('BTC'); //change coin to currency
export const amountDueAtom = atom(0);
export const cryptoAddressAtom = atom('');
export const timeLeftOnQuoteAtom = atom(); 
export const timeLeftToPayAtom = atom(); 
export const countdownAtom = atom<number | null>(null);