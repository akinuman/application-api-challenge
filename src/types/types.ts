export namespace PokemonTypes {
  export interface QueryParams {
    limit: string;
    offset: string;
  }

  export interface ByIdParams {
    id: string;
  }

  export interface Base {
    id: string;
    number: string;
    name: string;
    image: string;
    classification: string;
  }

  export interface Info extends Base {
    weight: {
      minimum: string;
      maximum: string;
    };
    height: {
      minimum: string;
      maximum: string;
    };
  }

  export interface CreateInput extends Base {
    weight: {
      minimum: string;
      maximum: string;
    };
    height: {
      minimum: string;
      maximum: string;
    };
  }

  export interface Response {
    pokemons: Info[];
  }

  export interface ApiResponse {
    pokemon: Info;
  }

  export interface PaginationQuery {
    limit?: string;
    offset?: string;
  }
}
