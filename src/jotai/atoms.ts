import { atom } from "jotai"

export const selectedCurrencyAtom = atom('BTC'); 
export const amountDueAtom = atom(0);
export const timeLeftOnQuoteAtom = atom<number>(Date.now()); 
export const timeLeftToPayAtom = atom<number>(Date.now());