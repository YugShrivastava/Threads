import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import startApolloServer from "./graphql/index.js";

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use(cors<cors.CorsRequest>(), express.json());

app.use("/graphql", expressMiddleware(await startApolloServer()));

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});
