import { pokeApi } from "../../config/api/PokeApi";
import type { Pokemon } from "../../domain/entities/Pokemon";
import type {
  PokemonInfoResponse,
  PokemonResponse,
} from "../../infrastructure/interfaces/PokemonResponse.interface";
import { PokemonMapper } from "../../infrastructure/mappers/Pokemon.mapper";
export const getPokemons = async (
  page: number,
  limit: number = 20
): Promise<Pokemon[] | undefined> => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await pokeApi.get<PokemonResponse>(url);

    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokemonInfoResponse>(info.url);
    });

    const promiseAllInfoPokemon = await Promise.all(pokemonPromises);
    const pokemos = promiseAllInfoPokemon.map((pokemos) =>
      PokemonMapper.PokemonMapToEntity(pokemos.data)
    );

    console.log(pokemos[0])

    return pokemos;
  } catch (error) {
    throw new Error(`Error getting Pokemons`);
  }
};
