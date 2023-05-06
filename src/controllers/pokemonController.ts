import { FastifyRequest, FastifyReply } from "fastify";
import { GET_POKEMONS, GET_POKEMON_BY_ID } from "../graphql/queries";
import { client } from "../graphql";
import { PrismaClient } from "@prisma/client";
import { parsePagination } from "../utils/parsePagination";
import { PokemonTypes } from "../types/types";
import {
  convertDatabasePokemonToApiResponse,
  convertPokemonData,
} from "../utils/convertPokemonsData";

const prisma = new PrismaClient();

let allPokemons: PokemonTypes.Response["pokemons"] | null = null;

async function fetchAllPokemons() {
  try {
    const data = await client.request<PokemonTypes.Response>(GET_POKEMONS, {
      first: 151, // Assuming there are 151 Pokemons
    });
    allPokemons = data.pokemons;
  } catch (error) {
    console.error("Error fetching all pokemons:", error);
  }
}

fetchAllPokemons(); // Fetch all Pokemons when the application starts

async function getPokemonsFromCache(limit: number, offset: number) {
  let startIndex = limit * offset;
  let endIndex = (offset + 1) * limit;

  return allPokemons?.slice(startIndex, endIndex);
}

async function getPokemonFromDatabase(id: string) {
  return await prisma.pokemon.findUnique({ where: { id } });
}

async function savePokemonToDatabase(pokemonData: PokemonTypes.CreateInput) {
  return await prisma.pokemon.create({
    data: {
      id: pokemonData.id,
      image: pokemonData.image,
      number: pokemonData.number,
      name: pokemonData.name,
      classification: pokemonData.classification,
      minimum_weight: pokemonData.weight.minimum,
      maximum_weight: pokemonData.weight.maximum,
      minimum_height: pokemonData.height.minimum,
      maximum_height: pokemonData.height.maximum,
    },
  });
}

export async function getPokemons(req: FastifyRequest, res: FastifyReply) {
  try {
    const { limit, offset } = parsePagination(
      req.query as PokemonTypes.QueryParams
    );

    if (!allPokemons) {
      res.status(500).send({ error: "Pokemons data not available" });
      return;
    }

    const pokemons = await getPokemonsFromCache(limit, offset);
    res.status(200).send(pokemons);
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    res.status(500).send({ error: "Failed to fetch pokemons" });
  }
}

export async function getPokemonById(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as PokemonTypes.ByIdParams;

  try {
    let pokemon = await getPokemonFromDatabase(id);

    if (!pokemon) {
      // Fetch the Pokemon from the external API
      const data = await client.request<PokemonTypes.ApiResponse>(
        GET_POKEMON_BY_ID,
        {
          id,
        }
      );
      // Convert the received data to the required format
      const convertedData = convertPokemonData(data.pokemon);

      // Save the Pokemon data in the database
      pokemon = await savePokemonToDatabase(convertedData);

      res.status(200).send(convertedData);
    } else {
      const convertedPokemon = convertDatabasePokemonToApiResponse(pokemon);
      res.status(200).send(convertedPokemon); // Send `pokemon` when it's found in the database
    }
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    res.status(500).send({ error: "Failed to fetch pokemon" });
  }
}
