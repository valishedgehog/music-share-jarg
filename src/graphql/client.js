import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

const HASURA_URI = "wss://leading-filly-32.hasura.app/v1/graphql";
const HASURA_SECRET_KEY = "";

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: HASURA_URI,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": HASURA_SECRET_KEY,
        },
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
