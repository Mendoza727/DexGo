export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    avatar: string;
    sprites: string[];
    moves: string[];
    stasts: string[];
    weight: number;
    abilities: string[];
    location: string;
    items: any[];
    color: string;
    //TODO: 
    // color: string; // para cambiar el color de la tarjeta
}