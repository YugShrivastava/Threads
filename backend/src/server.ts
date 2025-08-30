import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
const app = express()
const PORT: number = Number(process.env.PORT) || 3000
import cors  from "cors"

app.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})

interface gqlServer {
    typeDefs: String,
    resolvers: object
}

const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            sayName(name: String): String
        }
    `,
    resolvers: {
        Query: {
            hello: () => "Hello from server running with graphql",
            sayName: (_, {name}: {name: String}) => `Hello ${name}`
        }
    }
})

await gqlServer.start();

app.use(
    cors<cors.CorsRequest>(),
    express.json(),
);

app.use('/graphql', expressMiddleware(gqlServer))

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT)
})