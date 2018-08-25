import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import schema from "../../../schema.json";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";

const introspectionQueryResultData = {
  ...schema.data,
  __schema: {
    ...schema.data.__schema,
    types: schema.data.__schema.types.filter(
      (type: any) => type.possibleTypes !== null
    )
  }
};
import * as ActionCable from "actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

const hasSubscriptionOperation = ({ query: { definitions } }: any) => {
  return definitions.some(
    ({ kind, operation }: any) =>
      kind === "OperationDefinition" && operation === "subscription"
  );
};

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
});

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable: ActionCable.createConsumer() }),
  ApolloLink.from([
    withClientState({
      cache,
      defaults: {
        now: new Date().toISOString(),
        __typename: "Query"
      },
      resolvers: {
        Mutation: {
          tick: (
            _: any,
            _variables: any,
            { cache }: { cache: InMemoryCache }
          ) => {
            cache.writeQuery({
              query: gql`
                query getNow {
                  now @client
                }
              `,
              data: {
                now: new Date().toISOString()
              }
            });

            return null;
          }
        }
      },
      typeDefs: `
      type Query {
        now: String
      }

      type Mutation {
        tick(now: String)
      }
    `
    }),
    new HttpLink({
      uri: "/graphql",
      credentials: "include"
    })
  ])
);

export default new ApolloClient({
  cache,
  link
});
