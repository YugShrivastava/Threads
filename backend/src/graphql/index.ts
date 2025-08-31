import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";
import type { BaseContext } from "@apollo/server";

async function startApolloServer () {
    const gqlServer = new ApolloServer<BaseContext>({
    typeDefs: `#graphql
        type Query {
            hello: String
        }

        type Mutation {
            ${User.mutations}
        }
    `,
    resolvers: {
        Query: {
            ...User.resolver.queriesResolver
        },
        Mutation: {
            ...User.resolver.mutationsResolver
        },
    },
});

await gqlServer.start();

return gqlServer;
}

export default startApolloServer