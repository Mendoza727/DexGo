import type { Pokemon } from "../../domain/entities/Pokemon";
import type { PokemonInfoResponse } from "../interfaces/PokemonResponse.interface";

export class PokemonMapper {
  static PokemonMapToEntity(data: PokemonInfoResponse): Pokemon {
    const sprites = PokemonMapper.getSprites(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

    return {
      id: data.id,
      avatar: avatar,
      name: data.name,
      sprites: sprites,
      types: data.types.map((value) => value.type.name),
      stasts: data.stats.map((value) => value.stat.name),
      abilities: data.abilities.map((value) => value.ability.name),
      moves: data.moves.map((value) => value.move.name),
      weight: data.weight,
      items: data.held_items,
      location: data.location_area_encounters,
    };
  }

  static getSprites(data: PokemonInfoResponse): string[] {
    const sprites: any[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.["official-artwork"].front_default)
      sprites.push(data.sprites.other?.["official-artwork"].front_default);
    if (data.sprites.other?.["official-artwork"].front_shiny)
      sprites.push(data.sprites.other?.["official-artwork"].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }
}
