import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.EXTERNAL_API_URL || "https://graphql-pokemon2.vercel.app/";

export const client = new GraphQLClient(endpoint);
