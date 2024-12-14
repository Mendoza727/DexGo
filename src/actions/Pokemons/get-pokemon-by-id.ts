import { pokeApi } from "@/config/api/PokeApi";
import { Pokemon } from "@/domain/entities/Pokemon";
import { PokemonInfoResponse } from "@/infrastructure/interfaces/PokemonResponse.interface";
import { PokemonMapper } from "@/infrastructure/mappers/Pokemon.mapper";

export const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokemonInfoResponse>(
      `/pokemon/${pokemonId}`
    );

    const pokemon = await PokemonMapper.PokemonMapToEntity(data);

    return pokemon;
  } catch (error) {
    throw new Error(`Error getting pokemon by id ${pokemonId}`);
  }
};
