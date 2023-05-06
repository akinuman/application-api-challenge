import { gql } from "graphql-request";

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      classification
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
    }
  }
`;

export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: String!) {
    pokemon(id: $id) {
      id
      number
      name
      image
      classification
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
    }
  }
`;
