import { mutations } from "./mutations.js";
import { typeDefs } from "./typeDefs.js";
import { resolver } from "./resolvers.js";
import { queries } from "./queries.js";

export const User = { mutations, typeDefs, queries, resolver };
