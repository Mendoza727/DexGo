import { getColorApi } from "@/actions/colors/Get-Colors";
import type { Pokemon } from "@/domain/entities/Pokemon";
import type { PokemonInfoResponse } from "@/infrastructure/interfaces/PokemonResponse.interface";

export class PokemonMapper {
  static PokemonMapToEntity = async (
    data: PokemonInfoResponse
  ): Promise<Pokemon> => {
    const sprites = PokemonMapper.getSprites(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

    const color = await getColorApi(avatar);
    const rgbToColor = `rgb(${color?.dominantColor.join(", ")})`;

    return {
      id: data.id,
      name: data.name,
      avatar: avatar,
      sprites: sprites,
      types: data.types.map((type) => type.type.name),
      color: rgbToColor,

      games: data.game_indices.map((gma) => gma.version.name),
      abilitys: data.abilities.map((hability) => hability.ability.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      moves: data.moves
        .map((mv) => ({
          name: mv.move.name,
          level: mv.version_group_details[0].level_learned_at,
        }))
        .sort((a, b) => a.level - b.level),
    };
  };

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
