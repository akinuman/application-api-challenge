import { PokemonTypes } from "../types/types";

export function parsePagination(query: PokemonTypes.QueryParams): {
  limit: number;
  offset: number;
} {
  const limit = parseInt(query.limit as string, 10) || 10;
  const offset = parseInt(query.offset as string, 10) || 0;
  return { limit, offset };
}
