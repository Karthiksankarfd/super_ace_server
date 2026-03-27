export interface Card {
    rank: string;
    suit: string;
    color: 'Red' | 'Black';
    value: number;
    heldStatus? : boolean 
}

export interface Suit {
    name: string;
    color: 'Red' | 'Black';
}