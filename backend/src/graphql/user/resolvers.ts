const queriesResolver = {
    hello: () => {
        return "something random";
    },
};

const mutationsResolver = {
    createUser: async (_: any, { firstName, lastName, email, password }: {firstName: String, lastName: String, email: String, password: String}) => {
        return "something something";
    },
};

export const resolver = {
    queriesResolver,
    mutationsResolver,
};
