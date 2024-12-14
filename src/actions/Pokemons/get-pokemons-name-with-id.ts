import { pokeApi } from "@/config/api/PokeApi";
import { PokemonResponse } from "@/infrastructure/interfaces/PokemonResponse.interface";

export const getPokemosNamesWithId = async () => {
    const url = '/pokemon?limit=1000';

    const { data } = await pokeApi.get<PokemonResponse>(url);

    return data.results.map((info) => ({
        id: Number(info.url.split('/')[6]),
        name: info.name
    }));
}