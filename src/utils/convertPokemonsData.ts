import { Pokemon } from "@prisma/client";
import { PokemonTypes } from "../types/types";

export function convertPokemonData(
  pokemonData: PokemonTypes.Info
): PokemonTypes.CreateInput {
  return {
    id: pokemonData.id,
    image: pokemonData.image,
    number: pokemonData.number,
    name: pokemonData.name,
    classification: pokemonData.classification,
    weight: {
      minimum: pokemonData.weight.minimum,
      maximum: pokemonData.weight.maximum,
    },
    height: {
      minimum: pokemonData.height.minimum,
      maximum: pokemonData.height.maximum,
    },
  };
}

export function convertDatabasePokemonToApiResponse(
  pokemon: Pokemon
): PokemonTypes.Info {
  return {
    id: pokemon.id,
    image: pokemon.image,
    number: pokemon.number,
    name: pokemon.name,
    classification: pokemon.classification,
    weight: {
      minimum: pokemon.minimum_weight,
      maximum: pokemon.maximum_weight,
    },
    height: {
      minimum: pokemon.minimum_height,
      maximum: pokemon.maximum_height,
    },
  };
}
