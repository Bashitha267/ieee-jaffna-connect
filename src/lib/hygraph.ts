import { GraphQLClient } from "graphql-request";

export const hygraph = new GraphQLClient(
  import.meta.env.VITE_HYGRAPH_ENDPOINT
);
